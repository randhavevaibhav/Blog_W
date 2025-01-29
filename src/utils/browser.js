export const toggleTheme = () => {
    const isDark =  document.body.classList.contains("dark")
    if(isDark)
    {
      document.body.classList.remove("dark")
      document.body.classList.add("light")
    }else{
      document.body.classList.remove("light")
      document.body.classList.add("dark")
    }
   
  };