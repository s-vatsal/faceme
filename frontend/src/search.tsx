import React, {useState, useEffect} from 'react';
import {Container, Grid, Typography, TextField} from '@material-ui/core';
import { apiUrl } from './constants';
import FaceCard from './components/faceCard';
import styles from './css/faces.module.css';
import Face from './types/Face';

const Search = () => {
    const [items, setItems] = useState<Face[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    useEffect(() => {
    fetch(apiUrl + "/faces").then(data => {
        return data.json();
    }).then(data => {
      console.log(data);
      setItems(data);
    }).catch(err => {
        console.log(err)
    })
  }, []);
    
  useEffect(() => {

    if (searchQuery !== '') {
          const tempFaces:any = []
      items.map((item) => {
        let temp: string = item.faceName.toLowerCase();
                if (temp.includes(searchQuery.toLowerCase())) {
                  (tempFaces as any).push(item);
                }
            })
            setItems(tempFaces)
        } else {
            fetch(apiUrl + "/faces").then(data => {
                return data.json();
            }).then(data => {
              console.log(data);
              setItems(data);
            }).catch(err => {
                console.log(err)
            })
        }
    }, [searchQuery])
  

  
    const handleSearchChange = (e: any) => {
        console.log(e.target.value)
        setSearchQuery(e.target.value);
    }
  return (
    <>
      <Container className={styles.container} maxWidth="md">
              
        <div className={styles.recommend}>
        <div style={{ marginTop: "5px", marginBottom: "5px" }}>
            <Typography variant="h3">
              <b>Search for faces</b>
                      </Typography>
                      
                  </div>
                  
                  <Grid container alignItems="center" spacing={1}>
                      
                      <Grid item xs={12}>
                      <div>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Search"
                    type="text"
                    fullWidth
                    onChange={handleSearchChange}
                    variant="outlined"
                    value={searchQuery}
                    />
                          </div>
                          
                      </Grid>
                      {items.map((face, index) => {
              return (
                <Grid item xs={12} md={3} style={{ display: "flex" }} key={index}>
                  <FaceCard faceName={face.faceName} imageUrl={face.imageUrl} filename={face.filename}  key={index} labels={['']} />
                </Grid>
              );
            })}
            
          </Grid>
          </div>
      </Container>
      
    </>
  );
}

export default Search;