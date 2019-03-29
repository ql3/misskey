import $ from 'cafy';
import { ID } from '../../../../misc/cafy-id';
import define from '../../define';
import { generatePaginationQuery } from '../../common/generate-pagination-query';
import { Mutings } from '../../../../models';

export const meta = {
	desc: {
		'ja-JP': 'ミュートしているユーザー一覧を取得します。',
		'en-US': 'Get muted users.'
	},

	tags: ['mute', 'account'],

	requireCredential: true,

	kind: 'account/read',

	params: {
		limit: {
			validator: $.optional.num.range(1, 100),
			default: 30
		},

		sinceId: {
			validator: $.optional.type(ID),
		},

		untilId: {
			validator: $.optional.type(ID),
		},
	},

	res: {
		type: 'array',
		items: {
			type: 'Muting',
		}
	},
};

export default define(meta, async (ps, me) => {
	const query = generatePaginationQuery(Mutings.createQueryBuilder('muting'), ps.sinceId, ps.untilId)
		.andWhere(`muting.muterId = :meId`, { meId: me.id });

	const mutings = await query
		.take(ps.limit)
		.getMany();

	return await Mutings.packMany(mutings, me);
});
