import express from 'express';

import { tagController } from '../../../controllers/tag/tag.controller';

import { validateRequestBody } from '../../../middlewares/validate-request-body.middleware';
import { validateRequestParams } from '../../../middlewares/validate-request-params.middleware';
import { verifyUserJwt } from '../../../middlewares/verify-user-jwt.middleware';

import { JTagsTagDeleteParam } from '../../../schemas/tag/tag-delete.schema';
import { JTagsTagGetParam } from '../../../schemas/tag/tag-get.schema';
import { JTagsTagInsertBody } from '../../../schemas/tag/tag-insert.schema';
import { JTagsTagUpdateBody, JTagsTagUpdateParam } from '../../../schemas/tag/tag-update.schema';

const router = express.Router();

router.post(
    "/insert",
    verifyUserJwt(),
    validateRequestBody(JTagsTagInsertBody.schema, JTagsTagInsertBody.schemaValidateOptions),
    tagController.saveNewTag.bind(tagController)
);

router.get(
    "/get/:tagId",
    verifyUserJwt(),
    validateRequestParams(JTagsTagGetParam.schema, JTagsTagGetParam.schemaValidateOptions),
    tagController.getTag.bind(tagController)
);

router.put(
    "/update/:tagId",
    verifyUserJwt(),
    validateRequestParams(JTagsTagUpdateParam.schema, JTagsTagUpdateParam.schemaValidateOptions),
    validateRequestBody(JTagsTagUpdateBody.schema, JTagsTagUpdateBody.schemaValidateOptions),
    tagController.updateTag.bind(tagController)
);

router.delete(
    "/delete/:tagId",
    verifyUserJwt(),
    validateRequestParams(JTagsTagDeleteParam.schema, JTagsTagDeleteParam.schemaValidateOptions),
    tagController.deleteTag.bind(tagController)
);

export default router;