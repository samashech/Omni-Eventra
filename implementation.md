# Eventra Feature Implementation Plan

## Phase 1: Discover Page Polish & Core Trust
**Focus**: Enhancing the first impression, building user trust, and making event discovery seamless.

* [ ] **Trust Bar on Discover**: Add a row under the tagline with 'Verified Organizers', 'Encrypted Checkout', and 'Buyer Protection' using thin dividers and the navy-on-cream palette.
* [ ] **Category Filters**: Add a horizontal filter chip row (All, Concerts, College Fests, Workshops, Free Events) above the event grid.
* [ ] **Map View Toggle**: Add List/Map toggle. Map view will show a stylized city map with pins and popovers for event cards.
* [ ] **Consistent Iconography & Banners**: Replace emojis with line-icons/illustrations and add subtle banner images to event cards.
* [ ] **Save/Bookmark Events**: Add an animated bookmark icon to event cards and a new 'Saved Events' tab in navigation.
* [ ] **Countdown Pill**: Add a countdown pill ('Starts in 2d 14h') on cards for events happening within 7 days.

## Phase 2: Booking Flow & Checkout
**Focus**: Smooth seat selection, secure payment UX, and split payments.

* [ ] **Ticket Authenticity Badge**: On the event detail page, add a 'Verified Ticket · No Resale Scams' badge with a QR/shield icon and hover tooltip.
* [ ] **Simple Seat Map**: Create a color-coded seat selection component (e.g. General - gray, VIP - gold) with hover states for price/number and a sticky bottom summary bar. Max 2 clicks to proceed.
* [ ] **Polished Checkout Flow**: Implement a 3-step progress stepper (Select Tickets → Payment → Confirmation).
* [ ] **Payment Step UI**: Show card/UPI icons, lock icon with '256-bit encrypted', and an animated checkmark/shield on confirmation.
* [ ] **Split Payment UI**: Add a 'Split with friends' toggle in checkout, showing friend avatars, editable amounts, and a 'Send request' button.

## Phase 3: Friends & Coordination
**Focus**: In-app squad planning to replace screenshots and external messaging.

* [ ] **Populate Friends Page**:
    * 'Your Squad' section (horizontal avatars + Add Friend).
    * 'Group Plans' section (events friends are attending).
    * 'Invite to Event' modal to send in-app invites.
* [ ] **Meetup Point Sharing**: Add a 'Meetup Point' card to group bookings (e.g., 'Gate 2 · 7:30 PM') visible to everyone in the group.
* [ ] **In-app Squad Chat**: Add a lightweight chat panel attached to group bookings with static mockup messages and timestamps.

## Phase 4: My Tickets
**Focus**: A realistic, useful, and shareable digital ticket.

* [ ] **Populated Ticket Card**: Show event thumbnail, name, date/time, venue, large QR code placeholder, 'Add to Wallet/Calendar' buttons, and a green 'Verified' ribbon.
* [ ] **Share Instead of Screenshot**: Add a 'Share with friend' button opening a modal to transfer/duplicate ticket access securely.

## Phase 5: Delight Features & Notifications
**Focus**: Gamification and user awareness.

* [ ] **Notification Dropdown**: Design a rich dropdown for the bell icon with 3 sample notifications (friend booked, price drop, reminder).
* [ ] **Light Gamification**: Add small badge icons ('Squad Leader', 'Early Bird') next to the profile avatar, with a popover on hover/click.
