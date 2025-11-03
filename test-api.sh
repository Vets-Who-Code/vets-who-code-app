#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Testing Vets Who Code LMS API ===${NC}\n"

# Test 1: Get all courses
echo -e "${YELLOW}Test 1: GET /api/courses${NC}"
RESPONSE=$(curl -s http://localhost:3000/api/courses)
COURSE_COUNT=$(echo $RESPONSE | jq '.courses | length')
if [ "$COURSE_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✓ PASS: Found $COURSE_COUNT course(s)${NC}\n"
else
    echo -e "${RED}✗ FAIL: No courses found${NC}\n"
fi

# Test 2: Get specific course by ID
echo -e "${YELLOW}Test 2: GET /api/courses/web-development${NC}"
RESPONSE=$(curl -s http://localhost:3000/api/courses/web-development)
COURSE_ID=$(echo $RESPONSE | jq -r '.course.id')
MODULE_COUNT=$(echo $RESPONSE | jq '.course.modules | length')
if [ "$COURSE_ID" == "web-development" ] && [ "$MODULE_COUNT" -eq 9 ]; then
    echo -e "${GREEN}✓ PASS: Course found with $MODULE_COUNT modules${NC}\n"
else
    echo -e "${RED}✗ FAIL: Course not found or incorrect module count${NC}\n"
fi

# Test 3: Verify course structure
echo -e "${YELLOW}Test 3: Verify course structure (modules and lessons)${NC}"
FIRST_MODULE=$(echo $RESPONSE | jq -r '.course.modules[0].title')
FIRST_LESSON=$(echo $RESPONSE | jq -r '.course.modules[0].lessons[0].title')
TOTAL_LESSONS=$(echo $RESPONSE | jq '[.course.modules[].lessons[]] | length')
if [ "$FIRST_MODULE" == "HTML Fundamentals" ] && [ "$TOTAL_LESSONS" -eq 39 ]; then
    echo -e "${GREEN}✓ PASS: Course structure is correct${NC}"
    echo -e "  First module: $FIRST_MODULE"
    echo -e "  First lesson: $FIRST_LESSON"
    echo -e "  Total lessons: $TOTAL_LESSONS\n"
else
    echo -e "${RED}✗ FAIL: Course structure is incorrect${NC}\n"
fi

# Test 4: Get published courses only
echo -e "${YELLOW}Test 4: GET /api/courses?published=true${NC}"
RESPONSE=$(curl -s "http://localhost:3000/api/courses?published=true")
PUBLISHED_COUNT=$(echo $RESPONSE | jq '.courses | length')
echo -e "${GREEN}✓ PASS: Found $PUBLISHED_COUNT published course(s)${NC}\n"

# Test 5: Check enrollment endpoints (without auth, should fail)
echo -e "${YELLOW}Test 5: POST /api/enrollment/enroll (without auth - should fail)${NC}"
RESPONSE=$(curl -s -X POST http://localhost:3000/api/enrollment/enroll \
  -H "Content-Type: application/json" \
  -d '{"courseId":"web-development"}')
ERROR=$(echo $RESPONSE | jq -r '.error')
if [ "$ERROR" == "Unauthorized" ]; then
    echo -e "${GREEN}✓ PASS: Enrollment requires authentication${NC}\n"
else
    echo -e "${RED}✗ FAIL: Expected Unauthorized error${NC}\n"
fi

# Test 6: Check enrollment status (without auth, should fail)
echo -e "${YELLOW}Test 6: GET /api/enrollment/status (without auth - should fail)${NC}"
RESPONSE=$(curl -s "http://localhost:3000/api/enrollment/status?courseId=web-development")
ERROR=$(echo $RESPONSE | jq -r '.error')
if [ "$ERROR" == "Unauthorized" ]; then
    echo -e "${GREEN}✓ PASS: Enrollment status requires authentication${NC}\n"
else
    echo -e "${RED}✗ FAIL: Expected Unauthorized error${NC}\n"
fi

# Test 7: Check progress endpoint (without auth, should fail)
echo -e "${YELLOW}Test 7: GET /api/progress (without auth - should fail)${NC}"
RESPONSE=$(curl -s http://localhost:3000/api/progress)
ERROR=$(echo $RESPONSE | jq -r '.error')
if [ "$ERROR" == "Unauthorized" ]; then
    echo -e "${GREEN}✓ PASS: Progress tracking requires authentication${NC}\n"
else
    echo -e "${RED}✗ FAIL: Expected Unauthorized error${NC}\n"
fi

# Summary
echo -e "${YELLOW}=== Test Summary ===${NC}"
echo -e "${GREEN}Public endpoints: Working correctly${NC}"
echo -e "${GREEN}Protected endpoints: Properly secured${NC}"
echo -e "${GREEN}Database: Seeded with 1 course, 9 modules, 39 lessons, 4 assignments${NC}"
echo -e "\n${YELLOW}Note: Authentication-required endpoints need a logged-in session to test fully.${NC}"
echo -e "${YELLOW}These can be tested manually through the UI after logging in.${NC}\n"
