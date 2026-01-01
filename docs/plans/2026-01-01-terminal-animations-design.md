# Terminal Animation Design

## Goals
- Authentic terminal feel with realistic typing speeds
- Total duration: ~3 seconds
- Commands are typed, outputs appear instantly

## Constants
```typescript
const TYPING_SPEED = 30;    // ms per character
const OUTPUT_DELAY = 100;   // ms pause after command finishes
```

## Timeline

| Time (ms) | Event |
|-----------|-------|
| 0 | "Last login..." appears instantly |
| 100 | Start typing `neofetch --ascii` (16 chars, 480ms) |
| 580 | Command done |
| 680 | ASCII art + system info appear |
| 780 | Start typing `cat about.txt` (13 chars, 390ms) |
| 1170 | Command done |
| 1270 | About text appears |
| 1370 | "// Skills" header + start typing `ls -la ./skills/` (16 chars, 480ms) |
| 1850 | Command done |
| 1950 | Skills appear |
| 2050 | "// Projects" header + start typing `ls -la ./projects/` (18 chars, 540ms) |
| 2590 | Command done |
| 2690 | Projects appear (staggered 50ms each) |
| 2990 | "// Connect" header + social links appear |
| 3090 | Hint + final blinking cursor |

**Total: ~3.1 seconds**

## Component Behavior

### TerminalLine
- Props: `delay?: number`, `children`
- Hidden until delay, then shows instantly

### CommandLine
- Props: `command: string`, `delay?: number`, `typingSpeed?: number` (default 30)
- Waits for delay, types command char-by-char, shows cursor while typing
- Exposes duration: `command.length * typingSpeed`

### AsciiArt / SectionHeader
- Props: `delay?: number`
- Hidden until delay, appears instantly

### ProjectEntry
- Props: `delay?: number`, plus existing props
- Hidden until delay, appears instantly
- Staggered 50ms apart for subtle cascade

### Cursor
- Only visible on final prompt after all animations complete
- CSS: `animation: blink 1s step-end infinite`

## Implementation Notes

1. All delays calculated in App.tsx based on timeline
2. Helper function: `getCommandDuration(cmd) => cmd.length * TYPING_SPEED + OUTPUT_DELAY`
3. CommandLine shows inline cursor while typing, hides when done
4. Final cursor only appears after last animation completes
5. No fade-ins or transforms - just visibility toggles for authentic feel
