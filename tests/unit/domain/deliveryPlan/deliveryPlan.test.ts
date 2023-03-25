import { Result } from '../../../../src/core/logic/Result';
import { DeliveryPlan } from '../../../../src/domain/DeliveryPlan/deliveryPlan';

describe('Domain/DeliveryPlan', () => {
  test("Doesn't create a DeliveryPlan without deliveryPlanId", () => {
    expect(
      DeliveryPlan.create({
        deliveryPlanId: '',
        deliveryPlanDeliveries: null,
      }),
    ).toStrictEqual(Result.fail<DeliveryPlan>('DeliveryPlanID is required.'));
  });
});
