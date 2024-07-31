
export const EqualsId = (str1: String, str2: String) => {

    function removeSuffix(str: String) {
        const index = str.indexOf('-');
        if (index !== -1) {
          return str.slice(0, index);
        }
        return str;
      }

    const baseStr1 = removeSuffix(str1);
    const baseStr2 = removeSuffix(str2);
  
    // Porównanie stringów
    return baseStr1 === baseStr2;
  };

