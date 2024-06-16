import React from 'react';
import { useNavigate } from 'react-router-dom';
import './playerComponent.module.css';

const PlayerComponent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="navigation-bar">
        <div className="container">
          <a href="/" className="nav-brand">
            <div className="site-name">Denali</div>
          </a>
          <nav className="navigation-menu">
            <a href="/" className="navigation-link">Home</a>
            <a href="/about" className="navigation-link">About</a>
            <a href="/contact" className="navigation-link">Contact</a>
          </nav>
          <div className="menu-button">
            <div className="nav-icon-menu"></div>
          </div>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="container">
          <div className="row">
            <div className="content-column w-col-12">
              <div className="post-wrapper">
                <div className="post-content">
                  <h1 className="under-construction-heading">Em Construção</h1>
                  <p className="under-construction-message">
                    Esta página está em construção. Volte em breve para mais atualizações!
                  </p>
                </div>
              </div>
              <div className="button-wrapper">
                <button className="button" onClick={() => navigate('/')}>Voltar para Home</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerComponent;
