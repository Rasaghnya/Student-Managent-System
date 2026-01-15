-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`attendance` (
  `attendence_id` INT NULL,
  `student_id` VARCHAR(10) NULL,
  `date` DATE NOT NULL,
  `status` INT NOT NULL,
  PRIMARY KEY (`attendence_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `user_id` INT NULL,
  `user_name` VARCHAR(10) NOT NULL,
  `password` VARCHAR(10) NULL,
  `role` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `password_UNIQUE` (`password` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`marks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`marks` (
  `marks_id` INT NULL,
  `student_id` VARCHAR(10) NOT NULL,
  `subject` VARCHAR(10) NOT NULL,
  `marks` INT NOT NULL,
  PRIMARY KEY (`marks_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`student` (
  `student_id` VARCHAR(10) NOT NULL,
  `s_name` VARCHAR(10) NOT NULL,
  `s_email` VARCHAR(255) NOT NULL,
  `s_phone` VARCHAR(20) NULL,
  `course_id` INT NOT NULL,
  `attendance_attendence_id` INT NOT NULL,
  `user_user_id` INT NOT NULL,
  `marks_marks_id` INT NOT NULL,
  PRIMARY KEY (`student_id`),
  UNIQUE INDEX `student_id_UNIQUE` (`student_id` ASC) VISIBLE,
  UNIQUE INDEX `s_email_UNIQUE` (`s_email` ASC) VISIBLE,
  UNIQUE INDEX `s_phone_UNIQUE` (`s_phone` ASC) VISIBLE,
  INDEX `fk_student_attendence1_idx` (`attendence_attendence_id` ASC) VISIBLE,
  INDEX `fk_student_user1_idx` (`user_user_id` ASC) VISIBLE,
  INDEX `fk_student_marks1_idx` (`marks_marks_id` ASC) VISIBLE,
  INDEX `fk_student_course_idx` (`course_id` ASC) VISIBLE,
  CONSTRAINT `fk_student_attendence1`
    FOREIGN KEY (`attendence_attendence_id`)
    REFERENCES `mydb`.`attendance` (`attendence_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_student_user1`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `mydb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_student_marks1`
    FOREIGN KEY (`marks_marks_id`)
    REFERENCES `mydb`.`marks` (`marks_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_student_course`
    FOREIGN KEY (`course_id`)
    REFERENCES `mydb`.`courses` (`course_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`courses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`courses` (
  `course_id` INT UNIQUE NOT NULL,
  `course_name` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`course_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`courses_has_student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`courses_has_student` (
  `courses_course_id` INT NOT NULL,
  `student_student_id` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`courses_course_id`, `student_student_id`),
  INDEX `fk_courses_has_student_student1_idx` (`student_student_id` ASC) VISIBLE,
  INDEX `fk_courses_has_student_courses_idx` (`courses_course_id` ASC) VISIBLE,
  CONSTRAINT `fk_courses_has_student_courses`
    FOREIGN KEY (`courses_course_id`)
    REFERENCES `mydb`.`courses` (`course_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_courses_has_student_student1`
    FOREIGN KEY (`student_student_id`)
    REFERENCES `mydb`.`student` (`student_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
