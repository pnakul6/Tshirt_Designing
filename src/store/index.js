import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: '#EFBD48',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './pandit_ji.png',
  fullDecal: './pandit_ji.png',
});

export default state;