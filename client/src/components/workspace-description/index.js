import React, { useState, useEffect } from 'react';
import GlobalStyles from '../globalStyles.js';
import { Link } from './styles.js';
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
    <p>
      {description.slice(0, 397)} ... <Link onClick={handleShowMore}>Read More</Link>
    </p>
  );

  if (showMore) {
    descriptionMarkup = <p>{description}</p>
  }

  if (headline.length && description.length) {
    return (
      <div>
        <GlobalStyles />
        <h2>{headline}</h2>
        {descriptionMarkup}
      </div>
    );
  } else {
    return <></>;
  }
};

export default WorkspaceDescription;
