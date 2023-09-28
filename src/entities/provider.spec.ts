import { v1 as uuidv1 } from 'uuid';
import { expect, test } from 'vitest';

import { Provider } from './provider';

test('Create an provider', () => {
  const id = uuidv1();
  const provider = new Provider({
    id,
    name: 'Evandor Eduardo',
    fantasy: 'Gomides Motores',
    cnpj: '00.000.000/0000-00'
  });

  expect(provider).toBeInstanceOf(Provider);
});
