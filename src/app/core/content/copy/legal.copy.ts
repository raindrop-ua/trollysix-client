export const legalCopy = {
  privacyPolicy: {
    title: 'Privacy Policy',
    effectiveDate: 'Effective date: 25.02.2026',
    sections: [
      {
        title: '1. Introduction',
        content: [
          { type: 'paragraph', value: 'Welcome to TrollySix.' },
          {
            type: 'paragraph',
            value:
              'Your privacy is important. This Privacy Policy explains what information is collected (spoiler: almost none), how it is used, and what rights you have when using this website.',
          },
        ],
      },
      {
        title: '2. Information We Collect',
        content: [
          {
            type: 'paragraph',
            value:
              'TrollySix does not collect, store, process, or share any personal data.',
          },
          { type: 'paragraph', value: 'Specifically:' },
          {
            type: 'list',
            items: [
              'No user registration',
              'No login system',
              'No analytics tracking',
              'No advertising trackers',
              'No personal data collection',
              'No IP address logging',
              'No behavioral tracking',
              'No third-party analytics tools',
            ],
          },
        ],
      },
      {
        title: '3. Cookies',
        content: [
          {
            type: 'paragraph',
            value:
              'TrollySix uses a single local storage or cookie entry strictly for storing your selected theme preference (e.g., light or dark mode).',
          },
          { type: 'paragraph', value: 'This preference:' },
          {
            type: 'list',
            items: [
              'Is stored locally in your browser',
              'Is not transmitted to any server',
              'Is not used for tracking',
              'Contains no personal data',
            ],
          },
          {
            type: 'paragraph',
            value:
              'You may clear this preference at any time by clearing your browser storage.',
          },
        ],
      },
      {
        title: '4. Third-Party Services',
        content: [
          {
            type: 'paragraph',
            value:
              'TrollySix does not integrate with third-party analytics, advertising networks, or tracking services.',
          },
          {
            type: 'paragraph',
            value:
              'If the hosting provider automatically logs technical server data (such as standard access logs), this is outside the control of TrollySix and is handled according to the hosting provider’s policies.',
          },
        ],
      },
      {
        title: '5. Data Security',
        content: [
          {
            type: 'paragraph',
            value:
              'Since TrollySix does not collect personal data, there is no personal data to store, protect, or share.',
          },
        ],
      },
      {
        title: "6. Children's Privacy",
        content: [
          {
            type: 'paragraph',
            value:
              'TrollySix does not target or knowingly collect information from children or any specific age group.',
          },
        ],
      },
      {
        title: '7. Changes to This Policy',
        content: [
          {
            type: 'paragraph',
            value:
              'This Privacy Policy may be updated if the functionality of TrollySix changes in the future.',
          },
          {
            type: 'paragraph',
            value:
              'If data collection practices change, this document will be updated accordingly.',
          },
        ],
      },
      {
        title: '8. Contact',
        content: [
          {
            type: 'paragraph',
            value:
              'If you have any questions regarding this Privacy Policy, you may contact the project owner at:',
          },
          { type: 'paragraph', value: 'contacts@trolly6.com' },
        ],
      },
    ],
  },
  termsOfUse: {
    title: 'Terms of Use',
    effectiveDate: 'Effective date: 25.02.2026',
    sections: [
      {
        title: '1. Acceptance of Terms',
        content: [
          {
            type: 'paragraph',
            value:
              'By accessing and using TrollySix, you agree to these Terms of Use.',
          },
          {
            type: 'paragraph',
            value:
              'If you do not agree, please discontinue use of the website.',
          },
        ],
      },
      {
        title: '2. Service Description',
        content: [
          {
            type: 'paragraph',
            value:
              'TrollySix is an informational project that provides publicly available trolleybus schedule information.',
          },
          {
            type: 'paragraph',
            value:
              'The website is provided "as is" for informational purposes only.',
          },
        ],
      },
      {
        title: '3. No Guarantee of Accuracy',
        content: [
          {
            type: 'paragraph',
            value:
              'While efforts are made to keep the information accurate and up to date:',
          },
          {
            type: 'list',
            items: [
              'Schedule information may change',
              'Delays or operational changes may occur',
              'The website may contain inaccuracies',
            ],
          },
          {
            type: 'paragraph',
            value:
              'TrollySix is not responsible for missed transport, delays, or any consequences resulting from reliance on the information provided.',
          },
          {
            type: 'paragraph',
            value: 'Always verify official transport updates when necessary.',
          },
        ],
      },
      {
        title: '4. No User Accounts',
        content: [
          {
            type: 'paragraph',
            value:
              'TrollySix does not provide user accounts, registration, or user-generated content features.',
          },
        ],
      },
      {
        title: '5. Intellectual Property',
        content: [
          {
            type: 'paragraph',
            value:
              'All content, design, code, and branding of TrollySix are the intellectual property of the project owner unless otherwise stated.',
          },
          { type: 'paragraph', value: 'You may:' },
          {
            type: 'list',
            items: ['View the website', 'Share links to it'],
          },
          { type: 'paragraph', value: 'You may not:' },
          {
            type: 'list',
            items: [
              'Copy or redistribute content for commercial purposes without permission',
            ],
          },
        ],
      },
      {
        title: '6. Limitation of Liability',
        content: [
          {
            type: 'paragraph',
            value: 'TrollySix is provided without warranties of any kind.',
          },
          {
            type: 'paragraph',
            value: 'The project owner shall not be liable for:',
          },
          {
            type: 'list',
            items: [
              'Service interruptions',
              'Technical errors',
              'Inaccurate schedule data',
              'Any direct or indirect damages arising from use of the website',
            ],
          },
        ],
      },
      {
        title: '7. Modifications',
        content: [
          {
            type: 'paragraph',
            value:
              'These Terms may be updated at any time. Continued use of the website constitutes acceptance of the updated Terms.',
          },
        ],
      },
      {
        title: '8. Governing Law',
        content: [
          {
            type: 'paragraph',
            value:
              'These Terms shall be governed by the applicable laws of the country of residence of the project owner, unless otherwise required by applicable law.',
          },
        ],
      },
    ],
  },
} as const;
