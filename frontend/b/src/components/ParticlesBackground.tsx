import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';

const ParticlesBackground: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        autoPlay: true,
        background: {
          color: {
            value: "#000000"
          }
        },
        fullScreen: {
          enable: true,
          zIndex: 0
        },
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push"
            },
            onHover: {
              enable: true,
              mode: "repulse"
            }
          }
        },
        particles: {
          color: {
            value: "#ff0000"
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 6
          },
          number: {
            density: {
              enable: true,
              area: 800
            },
            value: 80
          },
          opacity: {
            value: 0.5
          },
          size: {
            value: { min: 1, max: 3 }
          }
        }
      }}
    />
  );
};

export default ParticlesBackground;