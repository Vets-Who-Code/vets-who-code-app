# Hashflag Graph — source of truth

`src/data/curriculum-graph/{topics,edges,subjects,manifest}.json` is **generated output**, not
hand-maintained. It is produced by `build.py` from `src/*.txt` in the Hashflag Graph project,
and a clean rebuild reproduces the shipped files byte for byte (verified).

Edit the generator source and rebuild. Editing the JSON in this repo directly will be
overwritten on the next build, and will also invalidate the sha256 digests in `manifest.json`.

## Which generator

There are two generations in circulation and they are not interchangeable:

| | shipped here | `education/curriculum/hashflag-graph` |
|---|---|---|
| version | v2.3 | v2.3 |
| topics / edges | 375 / 529 | 304 / 442 |
| grouping | 8 subjects, 53 domains | phases and modules |
| files | topics, edges, subjects, manifest | topics, edges, modules, manifest |
| generator | one `build.py` over `src/*.txt` | `build/phase1..4.py`, `additions*.py` |

The dataset in this repo came from the newer single-`build.py` project. The local clone under
`education/curriculum` is the **older** 304/442 generation — it is where the retired "304
micro-topics / 442 prerequisite edges" copy originally came from. Do not apply changes there
expecting them to reach this site.

## Pending upstream change

`doc-comments-edge.patch` moves "Comment for the reader who follows" from the documentation
domain into code-review and links it to "Write a reviewable pull request". It has been applied
to the JSON in this repo; it still needs applying to the generator source, or the next build
will drop it.

    git apply docs/curriculum-graph/doc-comments-edge.patch   # from the graph project root

Effect: edges 528 → 529, soft 93 → 94, documentation 4 → 3, code-review 3 → 4. Hard edges,
roots, terminals and maxDepth are unchanged, because a soft link does not set depth.
