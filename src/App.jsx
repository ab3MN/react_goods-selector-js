import 'bulma/css/bulma.css';
import './App.scss';
import { useState, memo, useCallback } from 'react';

export const goods = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const Good = memo(
  ({ name = '', changeGood = () => {}, isActive = false }) => {
    const goodClass = isActive ? 'has-background-success-light' : '';
    const buttonClass = isActive ? 'button is-info' : 'button';

    return (
      <tr data-cy="Good" className={goodClass}>
        <td>
          <button
            data-cy={isActive ? 'RemoveButton' : 'AddButton'}
            type="button"
            className={buttonClass}
            onClick={() => changeGood(name)}
          >
            {isActive ? '-' : '+'}
          </button>
        </td>

        <td data-cy="GoodTitle" className="is-vcentered">
          {name}
        </td>
      </tr>
    );
  },
  (prevProps, nextProps) => prevProps.isActive === nextProps.isActive,
);

const GoodsBoody = ({
  goodsList = [],
  changeGood = () => {},
  activeGood = '',
}) => (
  <tbody>
    {goodsList.map(el => (
      <Good
        name={el}
        changeGood={changeGood}
        isActive={activeGood === el}
        key={el}
      />
    ))}
  </tbody>
);

export const App = () => {
  const [good, setGood] = useState('Jam');

  const selectGood = useCallback(
    name => (good === name ? setGood(null) : setGood(name)),
    [good],
  );

  return (
    <main className="section container">
      <h1 className="title is-flex is-align-items-center">
        {!good ? 'No goods selected' : `${good} is selected`}
        {good && (
          <button
            data-cy="ClearButton"
            type="button"
            className="delete ml-3"
            onClick={() => setGood(null)}
          />
        )}
      </h1>

      <table className="table">
        <GoodsBoody
          goodsList={goods}
          changeGood={selectGood}
          activeGood={good}
        />
      </table>
    </main>
  );
};
