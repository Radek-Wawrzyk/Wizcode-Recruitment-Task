import { describe, it, expect, beforeEach } from 'vitest';
import { useLayout } from '../useLayout';

describe('useLayout composable', () => {
  let layout: ReturnType<typeof useLayout>;

  beforeEach(() => {
    layout = useLayout();
    layout.state.sidebarOpen = false;
  });

  it('should have the initial state of sidebarOpen set to false', () => {
    expect(layout.state.sidebarOpen).toBe(false);
    expect(layout.isSidebarOpen.value).toBe(false);
  });

  it('toggleSidebar should change sidebarOpen state to true', () => {
    layout.toggleSidebar();
    expect(layout.state.sidebarOpen).toBe(true);
    expect(layout.isSidebarOpen.value).toBe(true);
  });

  it('calling toggleSidebar twice should change sidebarOpen state back to false', () => {
    layout.toggleSidebar();
    layout.toggleSidebar();
    expect(layout.state.sidebarOpen).toBe(false);
    expect(layout.isSidebarOpen.value).toBe(false);
  });
});
