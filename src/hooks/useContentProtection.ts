import { useEffect } from 'react';

export const useContentProtection = () => {
  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'U') ||
        (e.metaKey && e.altKey && e.key === 'u') // Mac specific for source
      ) {
        e.preventDefault();
      }

      // Prevent Copy (Ctrl+C / Cmd+C)
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
          e.preventDefault();
          // Optional: Show a toast or message
          console.log('Copying is disabled.');
        }
      }
    };

    // Console warning
    const showConsoleWarning = () => {
      const warningTitle = 'Stop!';
      const warningMessage =
        'This is a browser feature intended for developers. If someone told you to copy-paste something here to enable a feature or "hack" someone\'s account, it is a scam and will give them access to your account.';

      console.log(
        `%c${warningTitle}`,
        'color: red; font-size: 50px; font-weight: bold; text-shadow: 2px 2px 0px black;'
      );
      console.log(
        `%c${warningMessage}`,
        'color: white; font-size: 18px; font-weight: bold; background-color: red; padding: 10px; border-radius: 5px;'
      );
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    showConsoleWarning();

    // Disable text selection globally via CSS injection
    const style = document.createElement('style');
    style.id = 'content-protection-style';
    style.innerHTML = `
      body {
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
      }
      /* Re-enable for forms */
      input, textarea, [contenteditable="true"] {
        user-select: text;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      const existingStyle = document.getElementById('content-protection-style');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);
};
