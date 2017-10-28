import { expect } from 'chai';

import { Math } from '../src/index';

describe('Math', function() {
    const math = new Math();
    it("2 + 3 = 5", function() {
        expect(math.add(2, 3)).to.equal(5);
    });
});