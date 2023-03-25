import { Result } from '../../../../src/core/logic/Result';
import { Packaging } from '../../../../src/domain/Packaging/packaging';

describe('Domain/Packaging', () => {
  test("Doesn't create a Packaging without packagingId", () => {
    expect(
      Packaging.create({
        packagingId: '',
        packagingX: '1',
        packagingY: '1',
        packagingZ: '1',
        packagingTruck: '1',
      }),
    ).toStrictEqual(Result.fail<Packaging>('PackagingID is required.'));
  });

  test("Doesn't create a Packaging without packagingX", () => {
    expect(
      Packaging.create({
        packagingId: '1',
        packagingX: '50',
        packagingY: '1',
        packagingZ: '1',
        packagingTruck: '1',
      }),
    ).toStrictEqual(Result.fail<Packaging>('PackagingX is not valid.'));
  });

  test("Doesn't create a Packaging without packagingY", () => {
    expect(
      Packaging.create({
        packagingId: '1',
        packagingX: '1',
        packagingY: '50',
        packagingZ: '1',
        packagingTruck: '1',
      }),
    ).toStrictEqual(Result.fail<Packaging>('PackagingY is not valid.'));
  });

  test("Doesn't create a Packaging without packagingZ", () => {
    expect(
      Packaging.create({
        packagingId: '1',
        packagingX: '1',
        packagingY: '1',
        packagingZ: '50',
        packagingTruck: '1',
      }),
    ).toStrictEqual(Result.fail<Packaging>('PackagingZ is not valid.'));
  });

  test("Doesn't create a Packaging without packagingTruck", () => {
    expect(
      Packaging.create({
        packagingId: '1',
        packagingX: '1',
        packagingY: '1',
        packagingZ: '1',
        packagingTruck: '',
      }),
    ).toStrictEqual(Result.fail<Packaging>('PackagingTruck is not valid.'));
  });
});
