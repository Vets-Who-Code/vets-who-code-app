---
title: "Three Cases Every Endpoint Test Covers"
postedAt: "2026-10-14T18:00:00.000Z"
author: "Jerome Hardaway"
description: "An endpoint test that only checks the happy path tests the part of the API least likely to hurt you. How Vets Who Code teaches troops to cover the happy path, validation failure and auth failure, with a FastAPI and pytest example."
image:
    {
        src: "v1685585775/checklist_pis3uf.jpg",
        alt: "Translucent document panels floating above a keyboard in blue light",
    }
category: "Engineering Practice"
tags:
    - engineering practice
    - testing
    - python
    - fastapi
    - vets who code
is_featured: false
---

Most first attempts at API tests send a good request and check for a `200`. That test is worth having. It's also the case least likely to hurt you, because it's the one everybody tried by hand. The incidents live in the other cases: the payload nobody expected, and the request that should never have been let in.

This is the sixth and last post in our series on how Vets Who Code teaches code review, debugging and testing.

## The Criterion

On the [backend testing domain page](/curriculum/testing-backend), the topic _Test API endpoints_ is described as "drives endpoints with a test client." Its evidence criterion:

> Covers happy path, validation failure and auth failure

Three cases, named, every time. The exit depth is _unassisted_. A troop shouldn't need a reviewer to ask "what happens without a token?" The test file should already answer it.

## The Endpoint

A small FastAPI service with one route: create a note for the signed-in user.

```python
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel, Field

app = FastAPI()
bearer = HTTPBearer(auto_error=False)

TOKENS = {"test-token": "troop-1"}  # stand-in for real token verification
NOTES: list[dict] = []


class NoteIn(BaseModel):
    title: str = Field(min_length=1, max_length=120)
    body: str = ""


def current_user(creds: HTTPAuthorizationCredentials | None = Depends(bearer)) -> str:
    if creds is None or creds.credentials not in TOKENS:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Not authenticated")
    return TOKENS[creds.credentials]


@app.post("/notes", status_code=status.HTTP_201_CREATED)
def create_note(note: NoteIn, user: str = Depends(current_user)) -> dict:
    saved = {"id": len(NOTES) + 1, "owner": user, **note.model_dump()}
    NOTES.append(saved)
    return saved
```

The in-memory `NOTES` list and the hardcoded token stand in for a database and a real verifier. The tests below don't care, which is the point.

## The Tests

`TestClient` drives the app in-process. No server, no network, no ports:

```python
import pytest
from fastapi.testclient import TestClient

from app.main import NOTES, app

client = TestClient(app)
AUTH = {"Authorization": "Bearer test-token"}


@pytest.fixture(autouse=True)
def empty_store():
    NOTES.clear()
```

### Case 1: The happy path

```python
def test_creates_a_note():
    response = client.post("/notes", json={"title": "Standup"}, headers=AUTH)

    assert response.status_code == 201
    assert response.json() == {"id": 1, "owner": "troop-1", "title": "Standup", "body": ""}
```

Assert on the whole response body, not only the status. A `201` with the wrong owner is still a bug. Here the owner comes from the token, and the test pins it.

### Case 2: Validation failure

```python
@pytest.mark.parametrize(
    "payload, field",
    [
        ({"title": ""}, "title"),
        ({"title": "x" * 121}, "title"),
        ({"body": "no title"}, "title"),
        ({"title": "Standup", "body": 42}, "body"),
    ],
)
def test_rejects_an_invalid_note(payload, field):
    response = client.post("/notes", json=payload, headers=AUTH)

    assert response.status_code == 422
    assert response.json()["detail"][0]["loc"] == ["body", field]
    assert NOTES == []
```

Three habits are packed into this one:

- **Parametrize the edges.** Empty, one over the limit, missing, wrong type. Each row is a boundary someone could move by accident.
- **Assert on _which_ field failed.** A `422` for the wrong reason passes a status-only check.
- **Assert on the side effect.** A rejected request must not write anything. `NOTES == []` proves the handler never ran.

### Case 3: Auth failure

```python
@pytest.mark.parametrize(
    "headers",
    [
        {},
        {"Authorization": "Bearer expired-token"},
        {"Authorization": "Basic dHJvb3A6cGFzcw=="},
    ],
)
def test_rejects_a_request_without_a_valid_token(headers):
    response = client.post("/notes", json={"title": "Standup"}, headers=headers)

    assert response.status_code == 401
    assert NOTES == []
```

No token, a bad token, the wrong scheme. These are the requests an attacker sends first, so they're the ones to test first. Again, assert that nothing was written. An endpoint that returns `401` _after_ saving the note has an auth check that's just for show.

One more auth test is worth its four lines:

```python
def test_checks_auth_before_validating_the_body():
    response = client.post("/notes", json={"title": ""})

    assert response.status_code == 401
```

An anonymous caller with a bad payload gets a `401`, not a `422`. FastAPI runs the `current_user` dependency before it reports body validation errors, so a stranger can't map your schema by sending junk and reading the error messages. The test makes sure a future refactor doesn't quietly reverse that order.

```text
$ pytest -q
.........                                              [100%]
9 passed
```

## Beyond the Three

The criterion sets the floor, not the ceiling. Once these three are habit, the next cases come naturally. A `403` when a signed-in user touches someone else's note. Pagination edges. What the endpoint does when a downstream service is down. The same domain page covers that last one with _Mock external APIs_, judged by whether a troop's "suite runs offline with no live API calls."

That matters more as more endpoints call a model. An endpoint that wraps an LLM call still needs all three cases, plus a test for the failure path when the model provider times out. Building with AI adds dependencies that fail in new ways. It doesn't remove the need to test the old ways.

## What a Reviewer Should See

A reviewer opening the test file for a new endpoint should find all three cases before reading a line of the handler. If one is missing, that's the first review comment, and it's a **blocking** one. That ties this series back to where it started: [find the defect, not the nit](/blogs/how-we-teach-code-review-find-the-defect-not-the-nit). An untested auth path is the defect.

### The Series: How VWC Teaches Code Review, Debugging and Testing

1. [How We Teach Code Review: Find the Defect, Not the Nit](/blogs/how-we-teach-code-review-find-the-defect-not-the-nit)
2. [The Reviewable Pull Request](/blogs/the-reviewable-pull-request)
3. [Debug by Stepping, Not by Printing](/blogs/debug-by-stepping-not-by-printing)
4. [Fix the Flaky Test at Its Cause](/blogs/fix-the-flaky-test-at-its-cause)
5. [Tests That Survive a Refactor](/blogs/tests-that-survive-a-refactor)
6. **Three Cases Every Endpoint Test Covers** (this post)

### Support Vets Who Code

Vets Who Code is free for every troop, and it stays that way because people like you keep it running. If this post was useful, [**Donate**](/donate) or [sponsor us on GitHub](https://github.com/sponsors/vetswhocode).

### Know a Veteran Who Wants to Code?

Vets Who Code is a free, remote software engineering accelerator for U.S. veterans, service members and spouses. If you know one who's ready to become a software engineer, send them this post and tell them to [**Apply**](/apply). We'll take it from there.
