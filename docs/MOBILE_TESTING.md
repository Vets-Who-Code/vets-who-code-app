# Mobile Testing Checklist

## Prerequisites
- [ ] App builds successfully
- [ ] No console errors
- [ ] All dependencies installed

## Functional Testing

### Navigation
- [ ] All menu items work
- [ ] Back button works correctly
- [ ] Deep links work
- [ ] Tab navigation functions
- [ ] Breadcrumbs work (if applicable)

### Authentication
- [ ] Login works
- [ ] Logout works
- [ ] Password reset works
- [ ] Remember me functions
- [ ] Session persists correctly
- [ ] Auth redirects work

### Forms
- [ ] All inputs are accessible
- [ ] Validation works
- [ ] Error messages display
- [ ] Success messages display
- [ ] File uploads work
- [ ] Auto-complete works
- [ ] Keyboard appears for correct input type

### Content
- [ ] All pages load correctly
- [ ] Images load and scale
- [ ] Videos play
- [ ] PDFs open
- [ ] External links work
- [ ] Share functionality works

## UI/UX Testing

### Touch Interactions
- [ ] Buttons respond to touch
- [ ] Tap targets are 44x44px minimum
- [ ] No hover-only features
- [ ] Swipe gestures work (if used)
- [ ] Pull-to-refresh works (if used)
- [ ] Long press actions work (if used)

### Layout
- [ ] No horizontal scroll
- [ ] Content fits viewport
- [ ] Proper spacing
- [ ] Correct alignment
- [ ] Readable font sizes (16px+ body)
- [ ] Cards/lists display correctly

### Responsive Design
- [ ] Works on small phones (320px)
- [ ] Works on large phones (414px)
- [ ] Works on tablets (768px+)
- [ ] Landscape orientation works
- [ ] Portrait orientation works
- [ ] Rotation handles gracefully

### Visual
- [ ] Colors consistent
- [ ] Branding correct
- [ ] Icons display properly
- [ ] Loading states show
- [ ] Empty states show
- [ ] No visual glitches

## Performance Testing

### Load Times
- [ ] Initial load < 3 seconds
- [ ] Page transitions smooth
- [ ] Images load progressively
- [ ] No blocking operations

### Offline Support
- [ ] App handles no connection
- [ ] Offline indicator shows
- [ ] Cached content available
- [ ] Queue syncs when online

### Memory
- [ ] No memory leaks
- [ ] Scrolling smooth
- [ ] Animations smooth (60fps)
- [ ] No crashes after extended use

## Compatibility Testing

### iOS
- [ ] iPhone SE (small screen)
- [ ] iPhone 12/13 (standard)
- [ ] iPhone 14 Pro Max (large)
- [ ] iPad (tablet)
- [ ] iOS 14+ (minimum supported)

### Android
- [ ] Small phone (5")
- [ ] Medium phone (6")
- [ ] Large phone (6.5"+)
- [ ] Tablet
- [ ] Android 8+ (minimum supported)

### Browsers
- [ ] Mobile Safari (iOS)
- [ ] Chrome (Android)
- [ ] Samsung Internet
- [ ] Firefox mobile

## Accessibility Testing

### Screen Readers
- [ ] VoiceOver works (iOS)
- [ ] TalkBack works (Android)
- [ ] All elements announced
- [ ] Navigation logical

### Vision
- [ ] Zoom to 200% works
- [ ] Text remains readable
- [ ] Contrast sufficient