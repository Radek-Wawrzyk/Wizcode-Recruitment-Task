# Find My Album - Project Documentation

## Introduction

This documentation describes a web application created in response to a task to develop a tool for browsing the top 100 albums from the iTunes API. The application was built using TypeScript and Vue, as required by the specifications.

## Technologies Used

- **Framework**: Vue 3
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Composables (custom hooks)
- **Styling**: SCSS with BEM architecture
- **API Management**: TanStack Query (Vue Query)
- **Unit Testing**: Vitest, Vue Test Utils
- **E2E Testing**: Playwright
- **Localization**: vue-i18n
- **Additional Libraries**:
  - dayjs (date handling)
  - es-toolkit (utility tools)
  - vue-tippy (tooltips)

## Application Architecture

The application has been designed according to Vue best practices, with an emphasis on modularity, testability, and maintainability. The main structure includes:

### Components

- **Base Components**:
  - BaseButton - multipurpose button component
  - BaseIcon - icon component handling SVG
  - BaseInput - input component with icon support
  - BaseMultiSelect - multi-selection component (used for category filtering)

- **Album Components**:
  - AlbumTile - single album tile
  - AlbumTilesList - list of tiles with empty state handling

- **App Components**:
  - AppHeader - header component
  - AppLoader - loading indicator
  - AppLayout - global application layout
  - AppSidebar - side navigation panel
  - AppThemeSwitcher - dark/light mode toggle

### Composables (Hooks)

- **useTopAlbums** - fetching and filtering albums from API
- **useFavoriteAlbums** - managing favorite albums
- **useImageLazyLoad** - lazy loading of images
- **useElementOverflow** - detecting if text is too long
- **useDarkMode** - managing dark/light mode
- **useLayout** - controlling layout state (e.g., sidebar open/close)

### Pages

- **HomePage** - home page with favorites and latest albums sections
- **TopAlbumsPage** - page with full list of top 100 albums
- **FavoriteAlbumsPage** - page with favorite albums

## Main Features

### 1. Displaying Top 100 Albums

The application fetches data from the iTunes API and presents it in the form of tiles. Each tile contains:
- Album cover image
- Album title
- Artist name
- Release year
- Price
- Number of tracks

### 2. Search and Filtering

- **Text Search** - allows filtering albums by artist name or album title
- **Category Filtering** - enables selection of multiple music categories simultaneously

### 3. Favorite Albums

I added a "Favorites" functionality that allows:
- Adding albums to favorites by clicking the heart icon
- Browsing favorite albums on a dedicated page
- Seeing favorite albums on the home page
- Storing favorite albums in localStorage (persistence between sessions)

### 4. Performance Optimization

- **Lazy Loading of Images** - images are loaded only when they are visible on the screen (uses Intersection Observer API)
- **Debounce for Search** - prevents too frequent filtering calls during text input

### 5. Responsive Design

The application is fully responsive and works correctly on:
- Mobile devices (phones)
- Tablets
- Desktop computers

### 6. Dark Mode

I implemented a dark/light mode toggle that:
- Adjusts the color palette of the entire application
- Stores the user's preference in localStorage
- Detects system preferences by default (prefers-color-scheme)

### 7. Multilingualism

The application supports multiple languages through vue-i18n, with translation files for:
- Polish
- English

### 8. Accessibility

I ensured accessibility through:
- Tooltips for elements with potentially truncated text
- Sufficient color contrast
- Keyboard navigation

## Testing Approach

A comprehensive testing approach was applied to the project:

### Unit Tests (Vitest)

All key components and composables are covered by unit tests:

1. **Component Tests**:
   Key components tested:
   - AlbumTile - testing rendering, favorite interactions, image loading states
   - AlbumTilesList - testing list rendering, empty states handling
   - BaseButton - testing various variants, sizes, and behaviors
   - BaseInput - testing input, event handling, and different states
   - BaseMultiSelect - testing multiple selection and interactions
   - BaseIcon - testing icon rendering with different sizes and colors

2. **Composables Tests**:
   Key composables tested:
   - useTopAlbums - testing data mapping, filtering
   - useFavoriteAlbums - testing adding/removing favorites, persistence
   - useImageLazyLoad - testing lazy loading handling
   - useElementOverflow - testing text overflow detection
   - useDarkMode - testing mode change and persistence

### End-to-End Tests (Playwright)

E2E tests were prepared for the main user paths:

1. **Home Page (home.test.ts)**:
   - Testing welcome title display
   - Favorites and latest albums sections
   - Navigation to other pages
   - Display of limited number of albums

2. **Top Albums (topAlbums.test.ts)**:
   - Text search
   - Category filtering
   - Adding to favorites
   - Displaying album details

3. **Favorites (favourite.test.ts)**:
   - Displaying favorites list
   - Removing from favorites
   - Empty state handling
   - Favorites persistence after refresh

4. **Layout and Navigation (layout.test.ts)**:
   - Toggling sidebar on mobile devices
   - Navigation through links
   - Toggling dark/light mode


## CSS Architecture

I applied the BEM (Block, Element, Modifier) methodology for the SCSS structure, which ensures:
- Style isolation between components
- Easy readability and code maintenance
- Logical style hierarchy

Additionally, I used CSS variables for colors, which facilitates the implementation of dark and light modes.

## Conclusions and Potential Improvements

The application meets all the requirements from the task, is responsive, accessible, and performant. It was designed with scalability in mind - it can be easily extended with new features.

Potential improvements:
- Pagination for a larger number of albums
- Integration with music playback API
- Adding a detailed album view
- Expanding the category and filtering system
