const ProjectCard = ({ title, description }) => {
  return (
    <div className="nes-container with-title is-dark">
      <p className="title">{title}</p>
      <p>{description}</p>
      <button type="button" className="nes-btn is-primary">View Project</button>
    </div>
  );
};

export default ProjectCard;