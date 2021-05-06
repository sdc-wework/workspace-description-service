import React, { useState, useEffect } from 'react';
import GlobalStyles from '../globalStyles.js';
import { useParams } from 'react-router-dom';
import {
  Header,
  H1,
  Mono,
} from './styles.js';

const WorkspaceHeader = () => {
  const { workspaceId } = useParams();
  const [title, setTitle] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    //* May need to add this back in. Disabling to see if I can hook up proxy
    //* I think this may be failing and then causing problems with the workspace description
    // fetch(`http://ec2-54-177-170-134.us-west-1.compute.amazonaws.com:5001/api/nearbyworkspaces/address/${workspaceId}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     setStreet(`${data.streetNumber} ${data.streetName}`);
    //     setCity(`${data.city}, ${data.state} ${data.zipcode}`);
    //   });
    fetch(`/api/workspace-description/${workspaceId}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.name);
      });
  }, []);

  return (
    <Header>
      <GlobalStyles />
      <H1>{title}</H1>
      <Mono>{street}<br/>{city}</Mono>
    </Header>
  );
};

export default WorkspaceHeader;
