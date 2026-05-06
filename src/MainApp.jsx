import React, {
  useState,
  useEffect,
  Suspense,
} from 'react';
import {
  Switch,
  Route,
  NavLink,
  useLocation,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import FallbackSpinner from './components/FallbackSpinner';
import NavBarWithRouter from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import endpoints from './constants/endpoints';

// Map component names to actual components
const componentRegistry = {
  About,
  Education,
  Experience,
  Projects,
  Skills,
  Contact,
};

const SectionWrapper = ({ componentName, headerTitle }) => {
  const Component = componentRegistry[componentName];
  if (!Component) return <FallbackSpinner />;
  return <Component header={headerTitle} />;
};

SectionWrapper.propTypes = {
  componentName: PropTypes.string.isRequired,
  headerTitle: PropTypes.string.isRequired,
};

function MainApp() {
  const [data, setData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetch(endpoints.routes, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  useEffect(() => {
    let scroll = null;

    try {
      const scrollEl = document.querySelector('[data-scroll-container]');
      if (!scrollEl || !window.LocomotiveScroll) return undefined;

      scroll = new window.LocomotiveScroll({
        el: scrollEl,
        smooth: true,
        lerp: 0.08,
        multiplier: 1,
        touchMultiplier: 2,
      });

      if (window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);
        scroll.on('scroll', window.ScrollTrigger.update);

        window.ScrollTrigger.scrollerProxy(scrollEl, {
          scrollTop(value) {
            if (arguments.length) {
              return scroll.scrollTo(value, 0, 0);
            }
            return scroll.scroll.instance.scroll.y;
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
          pinType: scrollEl.style.transform ? 'transform' : 'fixed',
        });

        const updateScroll = () => {
          if (scroll) {
            scroll.update();
            window.ScrollTrigger.refresh();
          }
        };

        window.ScrollTrigger.addEventListener('refresh', () => {
          if (scroll) scroll.update();
        });
        setTimeout(updateScroll, 500);
        scroll.scrollTo(0, { duration: 0, disableLerp: true });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Scroll initialization failed:', e);
    }

    const shimmer = document.querySelector('.mouse-shimmer');
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      if (window.gsap && shimmer) {
        window.gsap.to(shimmer, {
          x: clientX,
          y: clientY,
          duration: 0.8,
          ease: 'power2.out',
          opacity: 1,
        });
      }
    };

    const onMouseLeave = () => {
      if (window.gsap && shimmer) {
        window.gsap.to(shimmer, { opacity: 0, duration: 0.5 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseleave', onMouseLeave);

    return () => {
      if (scroll) scroll.destroy();
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [data, location]);

  return (
    <div className="MainApp">
      <div className="mouse-shimmer" />
      <NavBarWithRouter />
      <div data-scroll-container>
        <main className="main">
          <Suspense fallback={<FallbackSpinner />}>
            <Switch>
              <Route exact path="/" component={Home} />
              {data && data.sections.map((route) => (
                <Route
                  key={route.headerTitle}
                  path={route.path}
                  render={() => (
                    <SectionWrapper
                      componentName={route.component}
                      headerTitle={route.headerTitle}
                    />
                  )}
                />
              ))}
            </Switch>
          </Suspense>
        </main>
      </div>
      <footer
        className="footer-nav py-5"
        style={{
          background: '#090909',
          position: 'relative',
          zIndex: '2',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <Container className="text-center">
          <div className="d-flex justify-content-center flex-wrap gap-4">
            {data?.sections?.map((section) => (
              <NavLink
                key={section.headerTitle}
                to={section.path || '/'}
                className="nav-link text-white opacity-75 hover-opacity-100 fs-5"
                activeClassName="navbar__link--active"
                style={{ transition: 'all 0.3s' }}
              >
                {section.headerTitle}
              </NavLink>
            ))}
          </div>
          <div className="mt-4 text-white-50">
            {`© ${new Date().getFullYear()} Rishi Singh. Built with Passion.`}
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default MainApp;
