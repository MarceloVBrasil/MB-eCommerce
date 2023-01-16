export function validateEmail(email) {
  if (!email.includes("@") || !email.includes(".")) return false;

  const [username, domainExtension] = email.split("@");
  if (!username || !domainExtension) return false;

  const [domain, extension] = domainExtension.split(".");
  if (!domain || !extension) return false;

  return true;
}

export function validatePostalCode(postalCode) {
  if (postalCode.length < 6 || postalCode.length > 7) return false;
  if (postalCode.length === 7 && !validSeparateCharacter(postalCode[3]))
    return false;
  if (!evenDigitsAreLetters(postalCode)) return false;
  if (!oddDigitsAreNumbers(postalCode)) return false;
  return true;
}

export function validName(productName) {
  if(isNumber(productName)) return false
  if(!productName) return productName
  return !containsSpecialCharacter(productName)
}

export function validDescription(productDescription) {
  if(isNumber(productDescription)) return false
  if(!productDescription) return false
  return !containsSpecialCharacter(productDescription)
}

export function validBrandName(brandName) {
  if(isNumber(brandName)) return false
  if(!brandName) return false
  return !containsSpecialCharacter(brandName)
}

export function validCategoryName(categoryName) {
  if(isNumber(categoryName)) return false
  if(!categoryName) return false
  return !containsSpecialCharacter(categoryName)
}

export function validPrice(productPrice) {
  if(!productPrice) return false 
  return productPrice > 0
}

export function validQuantity(productQuantity) {
  if(!productQuantity) return false 
  return productQuantity > 0
}

export function validImageFile(file) {
  if (!file) return false
  const extension = getFileExtension(file.name)
  return ["png", "webp", "jpeg", "jpg"].includes(extension)
}

function containsSpecialCharacter(text) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(text)
}

function validSeparateCharacter(c) {
  return c === " " || c === "-";
}

function evenDigitsAreLetters(str) {
  const chars = str.split("").filter((c) => c !== " " && c !== "-");
  for (let i = 0; i < 6; i += 2) {
    if (!isLetter(chars[i])) return false;
  }
  return true;
}

function oddDigitsAreNumbers(str) {
  const chars = str.split("").filter((c) => c !== " " && c !== "-");
  for (let i = 0; i < 6; i += 2) {
    if (!isNaN(chars[i])) return false;
  }
  return true;
}

function isLetter(c) {
  return c.toLowerCase() !== c.toUpperCase();
}

function getFileExtension(filename) {
    if (!filename) return "";
    return filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
  }

function isNumber(text) {
  return !isNaN(text)
}