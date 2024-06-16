import React from 'react';
import { useNavigate } from 'react-router-dom';
import './playerComponent.module.css';
import profileImage from '../../assets/images/photo-1443180236447-432ea00e6ead.jpg';
import socialIcon1 from '../../assets/images/social-03.svg';
import socialIcon2 from '../../assets/images/social-07.svg';
import socialIcon3 from '../../assets/images/social-18.svg';
import socialIcon4 from '../../assets/images/social-09.svg';

const playerComponent: React.FC = () => {
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
            <div className="sidebar w-col-3">
              <div className="white-wrapper">
                <img src={profileImage} alt="Profile" className="circle-profile" />
                <p className="site-description">
                  Denali is a simple responsive blog template. Easily add new posts using the Editor or change layout and design using the Designer.
                </p>
                <div className="grey-rule"></div>
                <h2 className="small-heading">Featured Posts:</h2>
                <div className="feature-posts-list">
                  <div className="post-item">
                    <a href="#" className="small-post-link">Sample Post</a>
                  </div>
                  <div className="w-dyn-empty">
                    <p>No items found.</p>
                  </div>
                </div>
                <div className="grey-rule"></div>
                <div className="social-link-group">
                  <a href="#" className="social-icon-link">
                    <img src={socialIcon1} alt="Social Icon 1" width="25" />
                  </a>
                  <a href="#" className="social-icon-link">
                    <img src={socialIcon2} alt="Social Icon 2" width="25" />
                  </a>
                  <a href="#" className="social-icon-link">
                    <img src={socialIcon3} alt="Social Icon 3" width="25" />
                  </a>
                  <a href="#" className="social-icon-link">
                    <img src={socialIcon4} alt="Social Icon 4" width="25" />
                  </a>
                </div>
                <p className="built-with-webflow">
                  Built with <a target="_blank" href="https://webflow.com" className="webflow-link">Webflow</a>
                </p>
              </div>
            </div>
            <div className="content-column w-col-9">
              <div className="post-wrapper">
                <div className="post-content">
                  <div className="row">
                    <div className="col-4">
                      <a href="#" className="blog-image">Blog Image</a>
                    </div>
                    <div className="col-8">
                      <a href="#" className="blog-title-link">
                        <h2 className="blog-title">Blog Title</h2>
                      </a>
                      <div className="details-wrapper">
                        <div className="post-info">Post Info</div>
                        <div className="post-info">|</div>
                        <a href="#" className="post-info when-link">Date</a>
                      </div>
                      <div className="post-summary-wrapper">
                        <p className="post-summary">Post summary...</p>
                        <a href="#" className="read-more-link">Read more...</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="button-wrapper">
                <button className="button" onClick={() => navigate('/all-posts')}>More posts →</button>
              </div>
              <div className="sidebar-on-mobile">
                <div className="white-wrapper">
                  <img src={profileImage} alt="Profile" className="circle-profile" />
                  <p className="site-description">
                    Denali is a simple responsive blog template. Easily add new posts using the Editor or change layout and design using the Designer.
                  </p>
                  <div className="grey-rule"></div>
                  <h2 className="small-heading">Featured Posts:</h2>
                  <div className="feature-posts-list">
                    <div className="post-item">
                      <a href="#" className="small-post-link">Sample Post</a>
                    </div>
                    <div className="w-dyn-empty">
                      <p>No items found.</p>
                    </div>
                  </div>
                  <div className="grey-rule"></div>
                  <div className="social-link-group">
                    <a href="#" className="social-icon-link">
                      <img src={socialIcon1} alt="Social Icon 1" width="25" />
                    </a>
                    <a href="#" className="social-icon-link">
                      <img src={socialIcon2} alt="Social Icon 2" width="25" />
                    </a>
                    <a href="#" className="social-icon-link">
                      <img src={socialIcon3} alt="Social Icon 3" width="25" />
                    </a>
                    <a href="#" className="social-icon-link">
                      <img src={socialIcon4} alt="Social Icon 4" width="25" />
                    </a>
                  </div>
                  <p className="built-with-webflow">
                    Built with <a target="_blank" href="https://webflow.com" className="webflow-link">Webflow</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default playerComponent;
