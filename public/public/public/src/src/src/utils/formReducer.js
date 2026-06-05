export const initialFormState = {
  id: null,
  name: '',
  yield: '',
  ingredients: [{ amount: '', unit: '', name: '' }],
  instructions: ''
};

export function formReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };

    case 'UPDATE_INGREDIENT':
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.index][action.field] = action.value;
      return { ...state, ingredients: updatedIngredients };

    case 'ADD_INGREDIENT':
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          { amount: '', unit: '', name: '' }
        ]
      };

    case 'REMOVE_INGREDIENT':
      return {
        ...state,
        ingredients: state.ingredients.filter((_, i) => i !== action.index)
      };

    case 'LOAD_RECIPE':
      return action.recipe;

    case 'RESET':
      return initialFormState;

    default:
      return state;
  }
}
