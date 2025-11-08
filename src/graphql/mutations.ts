import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
  mutation SendMessage($message: String!) {
    chat(message: $message) {
      message
      timestamp
    }
  }
`;
