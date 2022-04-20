# Config contract
Simple contract for storing versioned data in TON blockchain.


## Supported interfaces
- [org.ton.introspection.v0](https://github.com/ton-foundation/specs/blob/main/specs/wtf-0001.md)
- org.ton.ownable.v0
- org.ton.config.v0

## **org.ton.config.v0** interface
### Get methods 
#### get_config
```func
(int, cell) get_config() method_id {
    return (version, config);
}
```
### Ops
```tlb
update_config#75636667 new_config:^Cell = UpdateConfigOp;
```


## **org.ton.config.v0** interface
### Get methods 
#### get_owner
```func
_ get_owner() method_id {
    var (owner, _, _) = load_data();
    return owner;
}
```
### Ops
```tlb
update_config#75636667 new_config:^Cell = UpdateConfigOp;
```