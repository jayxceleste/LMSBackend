/* eslint-disable import/no-extraneous-dependencies */
const validation = require('@Library/validation/');
const messages = require('@Library/message-resources');
// const { defineErrors } = require('@Library/helpers');
const repository = require('@Library/repository');
const { CreateLessonSchema, DeleteLessonSchema } = require('./schemaValidation');

module.exports = {
  ValidateCreateLesson: async ({ lessonInput }) => {
    const errors = validation.SchemaValidator(CreateLessonSchema())(lessonInput);
    // skip other validation when error occured on previous validation

    const result = await repository().LessonRepository.findLessonByName(lessonInput);
    if (result.length > 0) {
      errors.addFieldError('title', messages.LMS00002);
    }
    if (errors.hasError()) {
      throw errors;
    }
  },
  ValidateUpdateLesson: async ({ lessonUpdateInput }) => {
    const errors = validation.SchemaValidator(CreateLessonSchema(true))(lessonUpdateInput);
    // skip other validation when error occured on previous validation
    const result = await repository().LessonRepository.findLessonByName(lessonUpdateInput, true);
    if (result.length > 0) {
      errors.addFieldError('title', messages.LMS00002);
    }
    if (errors.hasError()) {
      throw errors;
    }
  },
  ValidateDeleteLesson: async ({ lessonDeleteInput }) => {
    const errors = validation.SchemaValidator(DeleteLessonSchema())(lessonDeleteInput);
    // skip other validation when error occured on previous validation
    if (errors.hasError()) {
      throw errors;
    }
  },
};
