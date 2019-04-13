
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// apply React 16 adapter
Enzyme.configure({ adapter: new Adapter() });

// Enzyme methods save to global
global.shallow = shallow;
global.render = render;
global.mount = mount;
