package com.ssafy.server.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@Entity
@Table(name = "common_code")
public class CommonCodeEntity  {
    @Id
    @Column(name = "common_code_id", nullable = false)
    private Integer commonCodeId;

    @Column(name = "common_code_type", nullable = false, columnDefinition = "varchar(50)")
    private String commonCodeType;

    @Column(name = "common_code_name", nullable = false, columnDefinition = "varchar(100)")
    private String commonCodeName;
}
