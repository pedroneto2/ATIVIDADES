import InvalidBody from '../exceptions/InvalidBody';
import { isValidObjectId } from 'mongoose';

async function verifySchema(schema, body) {
  try {
    await schema.validate(body, { abortEarly: false });
  } catch (error) {
    const message = error.errors.map((err) => err);
    throw new InvalidBody(message);
  }
}

function validateObjectId(objectId) {
  const validProjectID = isValidObjectId(objectId);

  if (!validProjectID) {
    throw new InvalidBody('Invalid Object ID!');
  }
}

export { verifySchema, validateObjectId };
