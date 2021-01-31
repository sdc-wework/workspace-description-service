import React, { useState, useEffect } from 'react';
import GlobalStyles from '../globalStyles.js';
import {
  Link,
  A,
  H2,
  P,
} from './styles.js';
import { useParams } from 'react-router-dom';

const WorkspaceDescription = () => {
  const { workspaceId } = useParams();
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => setShowMore(true);

  useEffect(() => {
    fetch(`/api/workspace-description/${workspaceId}`)
      .then(res => res.json())
      .then(data => {
        setHeadline(data.descriptionHeadline);
        setDescription(data.description);
      });
  }, []);

  let descriptionMarkup = (
    <P>
      {description.slice(0, 397)} ... <A onClick={handleShowMore}>Read More</A>
    </P>
  );

  if (showMore) {
    descriptionMarkup = <P>{description}</P>
  }

  if (headline.length && description.length) {
    return (
      <div>
        <GlobalStyles />
        <H2>{headline}</H2>
        {descriptionMarkup}
      </div>
    );
  } else {
    return <></>;
  }
};

export default WorkspaceDescription;
