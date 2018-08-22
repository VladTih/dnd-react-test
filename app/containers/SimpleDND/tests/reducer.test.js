import { fromJS, List, Map } from 'immutable';
import reducer from '../reducer';
import {
  moveBorders,
  moveCardsInsideDesk,
  moveCardsOutSideDesk,
  deleteDesk,
  deleteCard,
  addDesk,
  addCard,
  changeCardText,
} from '../actions';

describe('SimpleDND reducer', () => {
  const initialState = new Map({
    cards:
      new List([
      ]),
  });

  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      initialState,
    );
  });
  it('default check', () => {
    const action = {
      type: 'TEST',
    };

    const state = reducer(undefined, action);
    expect(state.get('cards').size).toBe(initialState.get('cards').size);
  });
  it('Init Borders check', () => {
    const action = {
      type: 'INIT_BORDERS',
    };
    expect(reducer(undefined, action)).toEqual(
      initialState,
    );
  });
  it('Borders move', () => {
    const localState = new Map({
      cards:
        new List([
          new List(new Map({ id: 1, text: '322' })),
          new List(new Map({ id: 1, text: '15' })),
        ]),
    });
    expect(reducer(localState, moveBorders(1, 0))).toEqual(
      fromJS(
        new Map({
          cards:
            new List([
              new List(new Map({ id: 1, text: '15' })),
              new List(new Map({ id: 1, text: '322' })),
            ]),
        })
      ));
  });
  it('Move cards outside desk check ', () => {
    const localState = new Map({
      cards:
        new List([
          new List([
            new Map({ id: 1, text: '322' }),
            new Map({ id: 2, text: 'check' }),
            new Map({ id: 3, text: 'check3' }),
          ]),
          new List([
            new Map({ id: 21, text: 'second_first' }),
            new Map({ id: 22, text: 'second_second' }),
          ]),
        ]),
    });
    expect(reducer(localState, moveCardsInsideDesk(0, 0, 1))).toEqual(
      fromJS(
        new Map({
          cards:
            new List([
              new List([
                new Map({ id: 2, text: 'check' }),
                new Map({ id: 1, text: '322' }),
                new Map({ id: 3, text: 'check3' }),
              ]),
              new List([
                new Map({ id: 21, text: 'second_first' }),
                new Map({ id: 22, text: 'second_second' }),
              ]),
            ]),
        })
      ));
  });
  it('Move cards inside desk check ', () => {
    const localState = new Map({
      cards:
        new List([
          new List([
            new Map({ id: 1, text: '322' }),
            new Map({ id: 2, text: 'check' }),
            new Map({ id: 3, text: 'check3' }),
          ]),
          new List([
            new Map({ id: 21, text: 'second_first' }),
            new Map({ id: 22, text: 'second_second' }),
          ]),
        ]),
    });
    const chekTime = Date.now();
    expect(reducer(localState, moveCardsOutSideDesk(0, 1, 1))).toEqual(
      fromJS(
        new Map({
          cards:
            new List([
              new List([
                new Map({ id: chekTime, text: 'second_second' }),
                new Map({ id: 1, text: '322' }),
                new Map({ id: 2, text: 'check' }),
                new Map({ id: 3, text: 'check3' }),
              ]),
              new List([
                new Map({ id: 21, text: 'second_first' }),
              ]),
            ]),
        })
      ));
  });
  it('Delete desk ', () => {
    const localState = new Map({
      cards:
        new List([
          new List([
            new Map({ id: 1, text: '322' }),
            new Map({ id: 2, text: 'check' }),
            new Map({ id: 3, text: 'check3' }),
          ]),
          new List([
            new Map({ id: 21, text: 'second_first' }),
            new Map({ id: 22, text: 'second_second' }),
          ]),
        ]),
    });
    expect(reducer(localState, deleteDesk(1))).toEqual(
      fromJS(
        new Map({
          cards:
            new List([
              new List([
                new Map({ id: 1, text: '322' }),
                new Map({ id: 2, text: 'check' }),
                new Map({ id: 3, text: 'check3' }),
              ]),
            ]),
        })
      ));
  });
  it('Delete card check ', () => {
    const localState = new Map({
      cards:
        new List([
          new List([
            new Map({ id: 1, text: '322' }),
            new Map({ id: 2, text: 'check' }),
            new Map({ id: 3, text: 'check3' }),
          ]),
          new List([
            new Map({ id: 21, text: 'second_first' }),
            new Map({ id: 22, text: 'second_second' }),
          ]),
        ]),
    });
    expect(reducer(localState, deleteCard(0, 1))).toEqual(
      fromJS(
        new Map({
          cards:
            new List([
              new List([
                new Map({ id: 1, text: '322' }),
                new Map({ id: 3, text: 'check3' }),
              ]),
              new List([
                new Map({ id: 21, text: 'second_first' }),
                new Map({ id: 22, text: 'second_second' }),
              ]),
            ]),
        })
      ));
  });
  it('Add new  desk check ', () => {
    const localState = new Map({
      cards:
        new List([
          new List([
            new Map({ id: 1, text: '322' }),
            new Map({ id: 2, text: 'check' }),
            new Map({ id: 3, text: 'check3' }),
          ]),
          new List([
            new Map({ id: 21, text: 'second_first' }),
            new Map({ id: 22, text: 'second_second' }),
          ]),
        ]),
    });
    expect(reducer(localState, addDesk())).toEqual(
      fromJS(
        new Map({
          cards:
            new List([
              new List([]),
              new List([
                new Map({ id: 1, text: '322' }),
                new Map({ id: 2, text: 'check' }),
                new Map({ id: 3, text: 'check3' }),
              ]),
              new List([
                new Map({ id: 21, text: 'second_first' }),
                new Map({ id: 22, text: 'second_second' }),
              ]),
            ]),
        })
      ));
  });
  it('Add new  card ', () => {
    const localState = new Map({
      cards:
        new List([
          new List([
            new Map({ id: 1, text: '322' }),
            new Map({ id: 2, text: 'check' }),
            new Map({ id: 3, text: 'check3' }),
          ]),
          new List([
            new Map({ id: 21, text: 'second_first' }),
            new Map({ id: 22, text: 'second_second' }),
          ]),
        ]),
    });
    expect(reducer(localState, addCard(1))).toEqual(
      fromJS(
        new Map({
          cards:
            new List([
              new List([
                new Map({ id: 1, text: '322' }),
                new Map({ id: 2, text: 'check' }),
                new Map({ id: 3, text: 'check3' }),
              ]),
              new List([
                new Map({ id: 23, text: '' }),
                new Map({ id: 21, text: 'second_first' }),
                new Map({ id: 22, text: 'second_second' }),
              ]),
            ]),
        })
      ));
  });
  it('Change Card Text ', () => {
    const localState = new Map({
      cards:
        new List([
          new List([
            new Map({ id: 1, text: '322' }),
            new Map({ id: 2, text: 'check' }),
            new Map({ id: 3, text: 'check3' }),
          ]),
          new List([
            new Map({ id: 21, text: 'second_first' }),
            new Map({ id: 22, text: 'second_second' }),
          ]),
        ]),
    });
    expect(reducer(localState, changeCardText({ deskIndex: 1, index: 1, text: 'Шо пацаны Аниме ?' }))).toEqual(
      fromJS(
        new Map({
          cards:
            new List([
              new List([
                new Map({ id: 1, text: '322' }),
                new Map({ id: 2, text: 'check' }),
                new Map({ id: 3, text: 'check3' }),
              ]),
              new List([
                new Map({ id: 21, text: 'second_first' }),
                new Map({ id: 22, text: 'Шо пацаны Аниме ?' }),
              ]),
            ]),
        })
      ));
  });
  it('ADD_CARD in empty desk', () => {
    const localState = new Map({
      cards:
        new List([
          new List(),
        ]),
    });
    expect(reducer(localState, addCard(0
    ))).toEqual(
      fromJS(
        new Map({
          cards:
            new List([
              new List([
                new Map({ id: 1, text: '' }),
              ]),
            ]),
        })
      ));
  });
  // it('INIT_PAGE check', () => {
  //   const action = {
  //     type: actionTypes.INIT_PAGE,
  //   };
  //
  //   const state = reducer(undefined, action);
  //   expect(state.get('pageType')).toBe(actionTypes.PAGE_TYPE);
  //   expect(state.get('pageInitialized')).toBe(false);
  // });
  //
  // it('INIT_PAGE_DONE check', () => {
  //   const action = {
  //     type: actionTypes.INIT_PAGE_DONE,
  //   };
  //
  //   const state = reducer(undefined, action);
  //   expect(state.get('pageInitialized')).toBe(true);
  // });
  //
  // it('SHOW_COMPANY_EDIT_MODAL', () => {
  //   const state = reducer(undefined, {
  //     type: actionTypes.SHOW_COMPANY_EDIT_MODAL,
  //     companyId: 1,
  //   });
  //
  //   expect(state.get('modalType')).toBe('company');
  //   expect(state.get('companyId')).toBe(1);
  // });
  //
  // it('SHOW_COMPANY_ADD_MODAL', () => {
  //   const state = reducer(undefined, {
  //     type: actionTypes.SHOW_COMPANY_ADD_MODAL,
  //   });
  //   expect(state.get('modalType')).toBe('company');
  // });
  //
  // it('HIDE_MODAL', () => {
  //   const state = reducer(state, {
  //     type: actionTypes.HIDE_MODAL,
  //   });
  //
  //   expect(state.get('modalType')).toBeNull();
  //   expect(state.get('companyId')).toBeNull();
  // });
  //
  // it('LOAD_COMPANIES SET_COMPANY', () => {
  //   let state = reducer(undefined, {
  //     type: 'NOTHING',
  //   });
  //
  //   expect(state.get('companies').toJS()).toEqual([]);
  //   expect(state.get('companiesLoading')).toBe(false);
  //
  //   state = reducer(undefined, {
  //     type: actionTypes.LOAD_COMPANIES,
  //   });
  //
  //   expect(state.get('companies').toJS()).toEqual([]);
  //   expect(state.get('companiesLoading')).toBe(true);
  //
  //   state = reducer(state, {
  //     type: actionTypes.SET_COMPANY,
  //     data: testCompanies,
  //   });
  //
  //   expect(state.get('companies').toJS()).toEqual(testCompanies.toJS());
  //   expect(state.get('companiesLoading')).toBe(false);
  // });
  //
  // it('CREATE_COMPANY, ADD_COMPANY, DELETE_COMPANY, UPDATE_COMPANY', () => {
  //   const company = new Company({
  //     id: 1,
  //     name: 'neftehim',
  //     description: 'nice company',
  //   });
  //
  //   let state = reducer(state, {
  //     type: actionTypes.ADD_COMPANY,
  //     data: company,
  //   });
  //
  //   expect(state.get('companies').first().name).toEqual('neftehim');
  //
  //   const updateAction = {
  //     type: actionTypes.UPDATE_COMPANY,
  //     companyId: 1,
  //     data: {
  //       name: 'new name',
  //       description: 'new description',
  //     },
  //   };
  //
  //   state = reducer(state, updateAction);
  //
  //   expect(state.get('companies').first().name).toEqual('new name');
  //
  //   const deleteAction = {
  //     type: actionTypes.DELETE_COMPANY,
  //     companyId: 1,
  //   };
  //
  //   expect(state.get('companies').size).toBe(1);
  //
  //   state = reducer(state, deleteAction);
  //   expect(state.get('companies').size).toBe(0);
  // });
  //
  // it('SET_ERROR_MESSAGE', () => {
  //   const state = reducer(state, {
  //     type: actionTypes.SET_ERROR_MESSAGE,
  //     message: 'error',
  //   });
  //
  //   expect(state.get('errorMessage')).toBe('error');
  // });
  //
  // it('SET_SUCCESS_MESSAGE', () => {
  //   const state = reducer(state, {
  //     type: actionTypes.SET_SUCCESS_MESSAGE,
  //     message: 'success',
  //   });
  //
  //   expect(state.get('successMessage')).toBe('success');
  // });
  //
  // it('do not delete/update if wrong id', () => {
  //   const company = new Company({
  //     id: 1,
  //     name: 'old value',
  //     description: 'old value',
  //   });
  //
  //   let state = reducer(state, {
  //     type: actionTypes.ADD_COMPANY,
  //     data: company,
  //   });
  //
  //   const updateAction = {
  //     type: actionTypes.UPDATE_COMPANY,
  //     companyId: 10,
  //     data: {
  //       name: 'new value',
  //       status: 'new value',
  //     },
  //   };
  //
  //   state = reducer(state, updateAction);
  //
  //   expect(state.get('companies').first().name).toEqual('old value');
  //
  //   const deleteAction = {
  //     type: actionTypes.DELETE_COMPANY,
  //     companyId: 10,
  //   };
  //
  //   expect(state.get('companies').size).toBe(1);
  //
  //   state = reducer(state, deleteAction);
  //   expect(state.get('companies').size).toBe(1);
  // });
});
