// This script prevents dark mode FOUC (flash of unstyled content)
// It must run before the page renders to determine the correct theme
export function ThemeScript() {
  const codeToRunOnClient = `
    (function() {
      // On page load or when changing themes, best to add inline in \`head\` to avoid FOUC
      function setTheme() {
        const theme = window.localStorage.getItem('theme') || 'system';
        const isDarkMode = theme === 'dark' || 
          (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        document.documentElement.classList.toggle('dark', isDarkMode);
      }

      setTheme();
      
      // Add event listener for system preference changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setTheme);
    })();
  `;

  // Use dangerouslySetInnerHTML to insert the script
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: codeToRunOnClient,
      }}
    />
  );
}
