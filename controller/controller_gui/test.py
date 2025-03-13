# def calculate_checksum(data):
#     checksum = 0
#     for byte in data:
#         checksum ^= byte
#     return checksum

# def verify_checksum(data, checksum):
#     calculated_checksum = calculate_checksum(data)
#     return calculated_checksum == checksum

# data_to_send = b'\x11\x22\x03\x24' 
# checksum_to_send = calculate_checksum(data_to_send) 
# print(hex(checksum_to_send))


# received_data = data_to_send
# received_checksum = checksum_to_send


# checksum_valid = verify_checksum(received_data, received_checksum)

# if checksum_valid:
#     print("pass")
# else:
#     print("failed")

def calculate_checksum(data):
    """Calculate a simple XOR checksum of all bytes in the data."""
    checksum = 0
    for byte in data:
        checksum ^= byte
    return checksum

def verify_checksum(data, checksum):
    """Verify that the calculated checksum matches the expected checksum."""
    calculated = calculate_checksum(data)
    return calculated == checksum

# Example usage
if __name__ == "__main__":
    # Test data
    data_to_send = b'\x11\x22\x03\x24'
    
    # Calculate checksum for outgoing data
    checksum_to_send = calculate_checksum(data_to_send)
    print(f"Calculated checksum: 0x{checksum_to_send:02x}")
    
    # Simulate receiving data
    received_data = data_to_send
    received_checksum = checksum_to_send
    
    # Verify received data integrity
    if verify_checksum(received_data, received_checksum):
        print("Checksum verification: PASSED")
    else:
        print("Checksum verification: FAILED")
