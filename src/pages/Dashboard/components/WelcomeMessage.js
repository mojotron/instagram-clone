import './styles/WelcomeMessage.css';

const WelcomeMessage = ({ headingText }) => {
  return (
    <div className="WelcomeMessage">
      <h3>{headingText}</h3>
      <p>
        This project is created by{' '}
        <a
          href="https://github.com/mojotron"
          target="_blank"
          rel="noopener noreferrer"
        >
          @mojotron
        </a>
        . Goal of this project is learning frontend development. If you find bug
        or you have suggestion or advice feel free to contact me.
      </p>
      <p>Start using app by adding a post or search for other users!</p>
      <p>Have fun and thank you for inspecting this project.</p>
    </div>
  );
};

export default WelcomeMessage;
