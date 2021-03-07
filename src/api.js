const checkIfError = response => {
  if (!response.ok) {
    throw new Error('An error has been encountered. Please check back later.');
  } else {
    return response.json();
  }
}



export const getData = path => fetch(`http://localhost:3001/api/v1/${path}`)
  .then(checkIfError)
  .catch(err => alert(err))