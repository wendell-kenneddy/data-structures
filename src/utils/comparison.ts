export function unwrapStringOrNumber(obj: any) {
  return obj instanceof Number || obj instanceof String ? obj.valueOf() : obj;
}

export function areEquivalent(a: any, b: any) {
  const unwrappedA = unwrapStringOrNumber(a);
  const unwrappedB = unwrapStringOrNumber(b);

  if (unwrappedA === unwrappedB) return true; //e.g. a and b both null
  if (unwrappedA === null || unwrappedB === null || typeof unwrappedA !== typeof unwrappedB)
    return false;
  if (unwrappedA instanceof Date)
    return unwrappedB instanceof Date && unwrappedA.valueOf() === unwrappedB.valueOf();
  if (typeof unwrappedA !== "object") return unwrappedA == unwrappedB; //for boolean, number, string, xml

  const newA = unwrappedA.areEquivalent_Eq_91_2_34 === undefined;
  const newB = unwrappedB.areEquivalent_Eq_91_2_34 === undefined;

  try {
    if (newA) unwrappedA.areEquivalent_Eq_91_2_34 = [];
    else if (
      unwrappedA.areEquivalent_Eq_91_2_34.some(function (other: any) {
        return other === unwrappedB;
      })
    )
      return true;

    if (newB) unwrappedB.areEquivalent_Eq_91_2_34 = [];
    else if (
      b.areEquivalent_Eq_91_2_34.some(function (other: any) {
        return other === unwrappedA;
      })
    )
      return true;
    unwrappedA.areEquivalent_Eq_91_2_34.push(unwrappedB);
    unwrappedB.areEquivalent_Eq_91_2_34.push(unwrappedA);

    const tmp: Record<string, any> = {};

    for (let prop in unwrappedA) if (prop != "areEquivalent_Eq_91_2_34") tmp[prop] = null;
    for (let prop in unwrappedB) if (prop != "areEquivalent_Eq_91_2_34") tmp[prop] = null;
    for (let prop in tmp) if (!areEquivalent(unwrappedA[prop], unwrappedB[prop])) return false;

    return true;
  } finally {
    if (newA) delete unwrappedA.areEquivalent_Eq_91_2_34;
    if (newB) delete unwrappedB.areEquivalent_Eq_91_2_34;
  }
}
