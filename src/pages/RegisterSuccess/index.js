import * as React from 'react'; 
import { Link } from 'react-router-dom';
import { Button, Card, LayoutOne, Text } from '../../components/ui';

export default function RegisterSuccess() {
  return (
    <LayoutOne size="small">
      <Card color="white">
        <Text as="h3" className="mb-2">
          Pendaftaran Berhasil
        </Text>
        <Text className="mb-6">
            Silahkan masuk ke aplikasi
        </Text>

        <Link to="/login">
          <Button fitContainer>
            Masuk 
          </Button>
        </Link>

      </Card>
    </LayoutOne>
  )
}
