import React from 'react';
import App from './App';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render, mount } from 'enzyme';
import renderer from 'react-test-renderer';


Enzyme.configure({ adapter: new Adapter() });

// test("fake test",()=>{
//   expect(true).toBeTruthy() ;
// });

it('renders without crashing', () => {
  shallow(<App />);
});

describe("<App/>", () => {
  it("render an serch area", () => {
    const component = shallow(<App />);
    expect(component.find('input').length).toEqual(1);
  })

  it("render an button", () => {
    const component = shallow(<App />);
    expect(component.find('button').length).toEqual(1);
  })

  it("render an h3 test", () => {
    const component = shallow(<App />);
    const text = component.find('h3.text-muted').text();
    expect(text).toEqual("Ankit Book Search");

  }) 

});

describe("<App/> snapshot", () => {
  it('App snapshot renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});