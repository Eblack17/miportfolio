# User Flow & Project Structure

This document outlines the primary user journeys through the portfolio website and details the project's file structure.

## User Flow

### Home Page Experience

#### Entry Points
- Direct URL access
- Social media links
- Search engine results
- External portfolio listings

#### Viewing Experience
- Hero section introduces the designer and sets expectations
- Featured projects showcase work capabilities
- Testimonials build credibility
- Call-to-action guides next steps

#### Navigation Options
- View portfolio projects
- Learn about the designer
- Contact for project inquiries
- View individual projects

#### User Actions
- Scroll through page content
- Click project thumbnails to view details
- Filter projects by category
- Navigate to other sections via main menu
- Contact via CTA buttons

#### Exit Points
- Navigate to Projects page
- Navigate to About page
- Navigate to Contact page
- View specific project details
- Exit site

### Project Details Flow

#### Entry Points
- Home page featured projects
- Projects page grid
- Related projects from another project page

#### Viewing Experience
- Project hero introduces the specific work
- Project details explain context, process, and results
- Image gallery showcases visual aspects
- Technology/tools used indicate capabilities
- Outcome and results demonstrate value

#### Navigation Options
- View next/previous projects
- Return to projects grid
- Contact for similar project needs

#### User Actions
- Scroll through project details
- Click gallery images to view in lightbox
- Navigate between gallery images
- Navigate to related projects
- Contact via CTA

#### Exit Points
- Return to Projects page
- Navigate to Contact page
- View next/previous project
- Exit site

### About Page Flow

#### Entry Points
- Main navigation
- Home page CTA
- Project page designer attribution

#### Viewing Experience
- Hero section with engaging introduction and statistics
- Personal story and design philosophy
- Skills and capabilities showcase
- Experience and education timeline
- Testimonials from clients
- Final CTA for project inquiries

#### Navigation Options
- View portfolio projects
- Contact for project inquiries
- Toggle between education and experience sections

#### User Actions
- Scroll through content sections
- Interact with skill cards
- Toggle timeline tabs
- Read testimonials
- Contact via CTA

#### Exit Points
- Navigate to Projects page
- Navigate to Contact page
- Exit site

### Contact Page Flow

#### Entry Points
- Main navigation
- CTAs from other pages
- Footer links

#### Viewing Experience
- Two-column layout with form and contact details
- Interactive form with floating labels and validation
- Contact information with visual elements
- FAQ section addressing common questions
- Final CTA reinforcing action

#### Navigation Options
- Return to other sections of the site
- Access social media profiles
- Explore FAQ items

#### User Actions
- Fill and submit contact form
- View contact information
- Expand/collapse FAQ items
- Click social media links
- Navigate to other sections via main menu

#### Exit Points
- Form submission success/confirmation
- Navigate to other website sections
- Visit social media profiles
- Exit site

## User Interaction Points

### Navigation Interactions

#### Header Structure
- Consistent header across all pages with logo and navigation menu
- Clear visual styling with sufficient contrast
- Prominent position at the top of every page

#### Menu Hover/Focus
- Visual feedback on hover/focus states for menu items
- Subtle animations for engagement
- Clear indication of interactive elements

#### Active Page Indication
- Visual indication of current page in the navigation
- Helps users understand their location in the site

#### Mobile Menu Toggle
- Hamburger icon that expands to full menu on smaller screens
- Smooth animation between states
- Accessible interaction patterns

#### Logo
- SVG logo with hover effect for consistent branding
- Links to homepage from all pages

### Project Grid Interactions

#### Filtering
- Category filters to narrow project display
- Active filter state clearly indicated
- Smooth transition when filtering changes

#### Hover Effects
- Visual feedback when hovering on project cards
- Preview information appears on hover
- Transition effects between states

#### Selection
- Clear clickable area for project selection
- Visual feedback when clicking
- Smooth transition to project detail page

### Image Gallery Interactions

#### Lightbox Viewing
- Images expand to lightbox view when clicked
- Background dimming to focus attention
- Close button clearly visible

#### Gallery Navigation
- Next/previous controls for moving between images
- Thumbnail navigation for direct access to specific images
- Keyboard navigation support (arrows, escape)

#### Responsive Behavior
- Adapts to screen size for optimal viewing
- Touch-friendly controls on mobile devices
- Maintains image aspect ratio across devices

### Form Interactions

#### Input Focus States
- Clear visual indication when field is active
- Floating labels that maintain context
- Validation feedback in real-time

#### Form Validation
- Inline error messages for invalid inputs
- Success indicators for valid inputs
- Submit button state changes based on form validity

#### Submission Feedback
- Loading indicator during submission
- Success message after successful submission
- Error handling with actionable feedback

#### Responsive Adjustment
- Form layout adapts to screen size
- Touch-friendly input areas on mobile
- Maintains usability across devices

### FAQ Accordion Interactions

#### Expansion/Collapse
- Question acts as toggle button for answers
- Visual indicator shows expanded/collapsed state
- Smooth animation between states

#### Focus States
- Clear visual indication when accordion item has focus
- Keyboard accessible interaction pattern
- Proper ARIA attributes for accessibility

## User Flow Diagram

```
┌──────────────┐     ┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│              │     │               │     │               │     │               │
│   Homepage   │────▶│  Projects     │────▶│  Project      │────▶│  Contact      │
│              │     │  Grid         │     │  Details      │     │  Page         │
│              │     │               │     │               │     │               │
└──────┬───────┘     └───────┬───────┘     └───────┬───────┘     └───────────────┘
       │                     │                     │
       │                     │                     │
       ▼                     ▼                     ▼
┌──────────────┐     ┌───────────────┐     ┌───────────────┐
│              │     │               │     │               │
│  About Page  │────▶│  Contact      │     │  Related      │
│              │     │  Page         │     │  Projects     │
│              │     │               │     │               │
└──────────────┘     └───────────────┘     └───────────────┘
```