import React,{useState, useEffect} from 'react'
import "./Character.css"

const Character = () => {
    const [characters, setCharacters] = useState([]);
  
    const toggleRotation = (index) => {
      setCharacters((prevCharacters) => {
        const updatedCharacters = [...prevCharacters];
        updatedCharacters[index].isRotated = !updatedCharacters[index].isRotated;
        return updatedCharacters;
      });
    };
  
    useEffect(() => {
      const getCharacters = async () => {
        try {
          const response = await fetch('https://rickandmortyapi.com/api/character/');
          const characterJson = await response.json();
          const charactersData = characterJson.results.map((character) => ({
            id: character.id,
            name: character.name,
            status: character.status,
            image: character.image,
            isRotated: false,
          }));
          return charactersData;
        } catch (error) {
          console.error('Error fetching characters:', error);
          return [];
        }
      };
  
      getCharacters().then((characters) => setCharacters(characters));
    }, []);
  
    return (
      <div className='characterDiv'>
        {characters.map((character, index) => (
          <div key={character.id}>
            <div>
              <img
                onClick={() => toggleRotation(index)}
                className={`imgCharacter ${character.isRotated ? 'rotation' : ''}`}
                src={character.image}
                alt={character.name}
              />
            </div>
            <h1 className='h1Character'>{character.name}</h1>
            <p className='pCharacter'>{character.status}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default Character;