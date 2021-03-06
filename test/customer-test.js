import {
  expect
} from 'chai';
import Customer from '../src/Customer';
import {
  testUserData
} from './test-data';

describe('Customer', function () {

  let customer, customer2;

  beforeEach(function () {
    customer = new Customer(testUserData[0]);
    customer2 = new Customer(testUserData[1]);
  });

  it('should be a function', function () {
    expect(Customer).to.be.a('function')
  });

  it('should be an instance of Customer', function () {
    expect(customer).to.be.an.instanceof(Customer)
  });

  it('should have an id', function () {
    expect(customer.id).to.equal(1);
  });

  it('should be able to have a different id', function () {
    expect(customer2.id).to.equal(2);
  });

  it('should have a name', function () {
    expect(customer.name).to.equal('Leatha Ullrich');
  });

  it('should be able to have a different name', function () {
    expect(customer2.name).to.equal('Rocio Schuster');
  });

});