// import React from 'react';

// function Events() {
//   return (
//     <div>
//       <h1>Events & Workshops</h1>
//       <p>This is the Events & Workshops page. You can update this content with details about upcoming events and workshops.</p>
//     </div>
//   );
// }

// export default Events;
import React from 'react';
import './Events.css';

const events = [
  {
    date: "Wed, May 15 @ 10:30 AM",
    title: "Little Movers Storytime",
    description: "This event will take place in person at the Tottenville Branch. Join us to hear stories, sing songs, and get those wiggles out as you help your active child build important early learning skills. Discover ways to promote early literacy at home and meet other caregivers in the neighborhood. Best for new walkers, toddlers/or children at this developmental stage. *Space is limited.*",
    location: "Tottenville Library",
    audience: "Children, Toddlers (18-36 months)"
  },
  {
    date: "Thu, May 16 @ 10:30 AM",
    title: "Lapsit Storytime",
    description: "This event will take place in person at the Tottenville Library. Join us for a special time to bond with your little one and meet other caregivers. We will explore the joys of movement, books, and songs, in addition to building early learning skills you can practice at home. Come prepared to sit with your child on your lap. Best for children who are pre-walkers or crawlers. *Space is limited.* Per NYPL policy face coverings are required for adults and children over 24 months.",
    location: "Tottenville Library",
    audience: "Children, Infant (0-18 months)"
  },
  {
    date: "Sat, May 18 @ 12 PM",
    title: "Planting Seeds Program for Kids!",
    description: "Join the Great Kills Garden Club as they teach kids all about planting seeds! Kids will be able to plant their very own seeds using recycled materials that are both creative and functional!",
    location: "Tottenville Library",
    audience: "Families"
  },
  {
    date: "Mon, May 20 @ 11 AM",
    title: "Canvas Painting for Adults",
    description: "This event will take place in-person at the Tottenville Library. Come to the library to explore your artistic side and learn to create your own masterpiece painting on canvas. Art supplies will be provided to you. Limited to 16 participants.",
    location: "Tottenville Library",
    audience: "Adults, 50+"
  },
  {
    date: "Tue, May 21 @ 4:15 PM",
    title: "Early Literacy Sensory Play and Springtime Craft",
    description: "Hey Kids!! Join us for sensory time and while you're at it, get into a springtime mood while using your artistic talents to make a fun spring craft! No registration required. Join us while supplies last. All children are welcome!!! Parental assistance is necessary! Ages 4-10 This program will take place in person. First Come, First Served!",
    location: "Tottenville Library",
    audience: "Children, School Age (5-12 years)"
  },
  // Add more events here...
];

function Events() {
  return (
    <div className="events-container">
      <h1>Events & Workshops</h1>
      {events.map((event, index) => (
        <div key={index} className="event-card">
          <h2>{event.title}</h2>
          <p><strong>Date/Time:</strong> {event.date}</p>
          <p><strong>Description:</strong> {event.description}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Audience:</strong> {event.audience}</p>
        </div>
      ))}
    </div>
  );
}

export default Events;