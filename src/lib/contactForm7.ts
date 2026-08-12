const CF7_ENDPOINT = 'https://alicatechnologies.com/wp-json/contact-form-7/v1/contact-forms/259/feedback';
const CF7_UNIT_TAG = 'wpcf7-f259-p9471-o1';
const CF7_CONTAINER_POST = '9471';

export interface ContactForm7Submission {
  name: string;
  email: string;
  message: string;
}

interface ContactForm7Response {
  status?: string;
  message?: string;
  invalid_fields?: Array<{ field?: string; message?: string }>;
}

export async function submitContactForm7({
  name,
  email,
  message,
}: ContactForm7Submission): Promise<void> {
  const formData = new FormData();
  formData.append('_wpcf7', '259');
  formData.append('_wpcf7_version', '6.1.6');
  formData.append('_wpcf7_locale', 'en_GB');
  formData.append('_wpcf7_unit_tag', CF7_UNIT_TAG);
  formData.append('_wpcf7_container_post', CF7_CONTAINER_POST);
  formData.append('_wpcf7_posted_data_hash', '');
  formData.append('text-775', name);
  formData.append('email-550', email);
  formData.append('textarea-138', message);

  const res = await fetch(CF7_ENDPOINT, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json() as ContactForm7Response;

  if (!res.ok || data.status !== 'mail_sent') {
    const firstInvalidField = data.invalid_fields?.find((field) => field.message);
    throw new Error(firstInvalidField?.message || data.message || 'Failed to send message. Please try again.');
  }
}
