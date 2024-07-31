export function generateRandomCode(length: number = 7): string {
    // Definiujemy znaki, które będą używane do generowania kodu
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    // Generujemy losowy kod o zadanej długości
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
  
    return result;
  }
  
  // Przykład użycia
  const randomCode = generateRandomCode();
  