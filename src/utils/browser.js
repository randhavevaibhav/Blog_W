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



  export const getLocalStorageItem = (key)=>{
    if(localStorage.getItem(key))
    {
      const item = localStorage.getItem(key);
      return(JSON.parse(item))

    }
   return null;
    
  }

  
  export const setLocalStorageItem = (key,value)=>{

    localStorage.setItem(key,JSON.stringify(value))
  
  }