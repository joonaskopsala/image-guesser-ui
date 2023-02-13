import React, {useState} from 'react';
import {Button, Box, CircularProgress, Typography} from '@mui/material';
import axios from 'axios';
import './App.css';

const GuessImage = () => {
  const [image, setImage] = useState(null);
  const [guess, setGuess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileInputChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:8080/guess', formData);
      setGuess(response.data.guess);
    } catch (error) {
      console.error(error);
      setGuess('An error occurred');
    }

    setLoading(false);
  };

  return (
    <Box className="root">
      <form className="form">
        <input
          accept="image/*"
          className="fileInput"
          id="image-input"
          type="file"
          onChange={handleFileInputChange}
        />
        <label htmlFor="image-input" className="fileLabel">
          <Button variant="contained" component="span">
            Select Image
          </Button>
        </label>
        <Button
          className="submitButton"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!image}
        >
          Submit
        </Button>
      </form>
      {loading ? (
        <CircularProgress className="progress" />
      ) : (
        guess && (
          <Typography variant="body1" className="guess">
            The image contains: {guess}
          </Typography>
        )
      )}
    </Box>
  );
};

export default GuessImage;
