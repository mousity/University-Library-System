import React from 'react';
import './Faq.css';

const faqs = [
  {
    question: "What are the library's operating hours?",
    answer: "Our library is open Monday to Friday from 9 AM to 10 PM, and closed on the weekends."
  },
  {
    question: "Do you have Physical location as well? If so, How do I get a library card?",
    answer: "Yes we do. We are located in Switzerland. You can get a library card by visiting our library with a valid ID and proof of address. The process is quick and you'll have your card on the same day."
  },
  {
    question: "Can I renew borrowed books online?",
    answer: "Yes, you can renew your borrowed books online through our library website or by using our mobile app."
  },
  {
    question: "Are there any late fees for overdue books?",
    answer: "Yes, there are late fees for overdue books. The fee is $200 per day per book. Please return or renew your books on time to avoid these fees."
  },
  {
    question: "Does the library offer free Wi-Fi?",
    answer: "Yes, we offer free Wi-Fi for all library Members. $300 per hour for Visitors, You can connect to the Wi-Fi using your library card credentials."
  },
  {
    question: "Are there any programs for children?",
    answer: "Yes, we have various programs for children, including storytime, arts and crafts, and educational workshops. Check our events calendar for more details."
  },
  {
    question: "Can I donate books to the library?",
    answer: "Yes, we accept book donations. Please bring your gently used books to the library during operating hours. Donations help us expand our collection."
  },
  {
    question: "How can I reserve a study room?",
    answer: "You can reserve a study room online through our website or by visiting the library's front desk. Study rooms can be reserved for up to 2 hours."
  },
  {
    question: "Does the library have printing and photocopying services?",
    answer: "Yes, we offer printing and photocopying services for a small fee. You can print from our computers or from your own device."
  },
  {
    question: "How can I volunteer at the library?",
    answer: "We welcome volunteers! Please visit our volunteer page on the library website to learn more about available opportunities and how to apply."
  }
];

function FAQ() {
  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <h2>{faq.question}</h2>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}

export default FAQ;